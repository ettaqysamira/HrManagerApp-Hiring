import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import PresenceService from '../services/presence.service';
import { toast } from 'sonner';
import Icon from '../components/AppIcon';

const AttendanceScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [lastScan, setLastScan] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const html5QrCodeRef = useRef(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const readerElement = document.getElementById("reader");
                if (!readerElement) {
                    console.error("Reader element not found");
                    return;
                }

                html5QrCodeRef.current = new Html5Qrcode("reader");
                setCameraError(null);

                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                };

                await html5QrCodeRef.current.start(
                    { facingMode: "environment" },
                    config,
                    onScanSuccess
                );
                setIsScanning(true);
            } catch (err) {
                console.error("Failed to start camera:", err);
                setCameraError(err.message || "Impossible d'accéder à la caméra.");
                toast.error("Erreur caméra : " + (err.message || "Vérifiez les permissions"));
            }
        };

        const timer = setTimeout(() => {
            startCamera();
        }, 800);

        return () => {
            clearTimeout(timer);
            if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                html5QrCodeRef.current.stop()
                    .then(() => {
                        html5QrCodeRef.current.clear();
                    })
                    .catch(err => console.error("Error stopping scanner", err));
            }
        };
    }, []);

    const onScanSuccess = async (decodedText) => {
        if (decodedText !== lastScan) {
            setLastScan(decodedText);
            setScanResult(decodedText);
            handleAttendanceProcess(decodedText);
            setTimeout(() => setLastScan(null), 5000);
        }
    };

    const handleAttendanceProcess = async (qrContent) => {
        console.log("Scanned QR Content:", qrContent);
        try {
            const response = await PresenceService.scan(0, 'Morning', qrContent);
            console.log("API Response:", response.data);

            if (response.data.status === "Accepted") {
                toast.success(response.data.message || "Pointage réussi");
            } else {
                toast.error(response.data.message || "Pointage refusé");
            }
        } catch (err) {
            console.error("Attendance Scan Error:", err);
            const serverMessage = err.response?.data?.message || err.response?.data?.Message;
            toast.error(serverMessage || "Erreur lors du pointage.");
        }
    };

    return (
        <div className="p-4 flex flex-col items-center gap-6">
            <div className="text-center mb-2">
                <h1 className="text-2xl font-bold text-primary">Scanner de Pointage</h1>
                <p className="text-sm text-muted-foreground mt-1">Placez votre badge QR devant la caméra</p>
            </div>

            <div className="w-full max-w-sm relative aspect-square overflow-hidden rounded-2xl border-4 border-primary/20 bg-black shadow-xl flex items-center justify-center">
                <div id="reader" className="w-full h-full [&>video]:object-cover"></div>

                {!isScanning && !cameraError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 text-white gap-3 p-6 text-center">
                        <Icon name="Loader2" className="animate-spin text-primary" size={32} />
                        <p className="text-sm font-medium">Initialisation de la caméra...</p>
                    </div>
                )}

                {cameraError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/90 text-white gap-4 p-6 text-center">
                        <Icon name="CameraOff" size={40} className="text-red-400" />
                        <div>
                            <p className="font-bold text-red-200">Erreur de Caméra</p>
                            <p className="text-xs text-red-300 mt-1">{cameraError}</p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors"
                        >
                            Réessayer
                        </button>
                    </div>
                )}

                {isScanning && (
                    <div className="absolute inset-0 pointer-events-none border-2 border-primary/30 animate-pulse">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                    </div>
                )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl w-full max-w-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon name="Info" size={20} />
                </div>
                <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">Session Actuelle</p>
                    <p className="text-base font-bold text-blue-900 dark:text-blue-100">Test (13:00 - 15:00)</p>
                </div>
            </div>

            {scanResult && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center w-full max-w-sm animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Dernier Code Lu</p>
                    <p className="font-mono font-bold text-sm text-green-700 dark:text-green-300 break-all bg-white/50 dark:bg-black/20 p-2 rounded">{scanResult}</p>
                </div>
            )}
        </div>
    );
};

export default AttendanceScanner;
