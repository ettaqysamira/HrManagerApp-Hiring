import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeDisplay = ({ employeeData, onRegenerate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  const qrValue = employeeData?.employeeId || "NO-ID";

  return (
    <div className="bg-card rounded-lg border border-border p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Code QR de Pointage</h2>
        <p className="text-sm text-muted-foreground">Scannez ce code pour enregistrer votre présence</p>
      </div>
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="bg-white p-6 rounded-lg border-4 border-primary shadow-lg mb-4">
          <div className="w-48 h-48 flex items-center justify-center">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrValue}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 w-full max-w-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="User" size={20} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">{employeeData?.name}</span>
            </div>
            <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
              {employeeData?.employeeId}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{employeeData?.department}</span>
            <span>{employeeData?.position}</span>
          </div>
        </div>
      </div>
      <div className="bg-accent/10 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">{formatDate(currentTime)}</p>
          <p className="text-3xl font-bold text-accent font-mono">{formatTime(currentTime)}</p>
        </div>
      </div>
      <div className="flex gap-3">

        <Button
          variant="default"
          fullWidth
          iconName="Download"
          iconPosition="left"
        >
          Télécharger
        </Button>
      </div>

    </div>
  );
};

export default QRCodeDisplay;