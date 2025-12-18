import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import PresenceService from '../services/presence.service';
import { authService as AuthService } from '../services/auth.service';
import { toast } from 'sonner';

const AttendanceScanner = () => {
    const [shift, setShift] = useState('Morning');
    const [scanResult, setScanResult] = useState(null);
    const [lastScan, setLastScan] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 5,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
            false
        );

        scanner.render(onScanSuccess, onScanFailure);
        scannerRef.current = scanner;

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode scanner. ", error);
                });
            }
        };
    }, []);

    const onScanSuccess = async (decodedText, decodedResult) => {
        if (decodedText !== lastScan) {
            setLastScan(decodedText);
            setScanResult(decodedText);

            handleAttendanceProcess(decodedText);

            setTimeout(() => setLastScan(null), 5000);
        }
    };

    const onScanFailure = (error) => {
    };

    const handleAttendanceProcess = async (qrContent) => {
        try {
            const user = AuthService.getCurrentUser();
            if (!user) {
                toast.error("Utilisateur non trouvé.");
                return;
            }

            const employeeId = user.id || user.employeeId;
            const response = await PresenceService.scan(employeeId, shift, qrContent);

            if (response.data.status === "Accepted") {
                toast.success(`Pointage accepté! Heure: ${response.data.time}`);
            } else {
                toast.error(`Pointage refusé: ${response.data.notes}`);
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Erreur lors du pointage.");
            }
        }
    };

    return (
        <div className="p-4 flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">Pointage QR</h1>

            <div className="flex gap-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="shift"
                        value="Morning"
                        checked={shift === 'Morning'}
                        onChange={(e) => setShift(e.target.value)}
                        className="w-5 h-5"
                    />
                    <span className="font-medium">Matin (Morning)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="shift"
                        value="Evening"
                        checked={shift === 'Evening'}
                        onChange={(e) => setShift(e.target.value)}
                        className="w-5 h-5"
                    />
                    <span className="font-medium">Soir (Evening)</span>
                </label>
            </div>

            <div className="w-full max-w-sm">
                <div id="reader" className="w-full"></div>
            </div>

            <p className="text-sm text-gray-500">
                Scannez le QR Code de l'entreprise pour pointer.
            </p>

            {scanResult && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded text-center w-full max-w-sm">
                    <p className="text-sm text-gray-600">Dernier scan :</p>
                    <p className="font-mono font-bold text-lg text-green-700 break-all">{scanResult}</p>
                </div>
            )}
        </div>
    );
};

export default AttendanceScanner;
