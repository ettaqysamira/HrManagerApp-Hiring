import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeDisplay = ({ employeeData, onRegenerate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);

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

  const handleRegenerateClick = () => {
    setShowRegenerateConfirm(true);
  };

  const handleConfirmRegenerate = () => {
    onRegenerate();
    setShowRegenerateConfirm(false);
  };

  const handleCancelRegenerate = () => {
    setShowRegenerateConfirm(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Code QR de Pointage</h2>
        <p className="text-sm text-muted-foreground">Scannez ce code pour enregistrer votre présence</p>
      </div>
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="bg-white p-8 rounded-lg border-4 border-primary shadow-lg mb-4">
          <div className="w-64 h-64 flex items-center justify-center">
            <svg viewBox="0 0 256 256" className="w-full h-full">
              <rect width="256" height="256" fill="white"/>
              <g fill="black">
                <rect x="0" y="0" width="32" height="32"/>
                <rect x="32" y="0" width="32" height="32"/>
                <rect x="64" y="0" width="32" height="32"/>
                <rect x="96" y="0" width="32" height="32"/>
                <rect x="128" y="0" width="32" height="32"/>
                <rect x="160" y="0" width="32" height="32"/>
                <rect x="192" y="0" width="32" height="32"/>
                <rect x="0" y="32" width="32" height="32"/>
                <rect x="192" y="32" width="32" height="32"/>
                <rect x="0" y="64" width="32" height="32"/>
                <rect x="64" y="64" width="32" height="32"/>
                <rect x="96" y="64" width="32" height="32"/>
                <rect x="128" y="64" width="32" height="32"/>
                <rect x="192" y="64" width="32" height="32"/>
                <rect x="0" y="96" width="32" height="32"/>
                <rect x="64" y="96" width="32" height="32"/>
                <rect x="96" y="96" width="32" height="32"/>
                <rect x="128" y="96" width="32" height="32"/>
                <rect x="192" y="96" width="32" height="32"/>
                <rect x="0" y="128" width="32" height="32"/>
                <rect x="64" y="128" width="32" height="32"/>
                <rect x="96" y="128" width="32" height="32"/>
                <rect x="128" y="128" width="32" height="32"/>
                <rect x="192" y="128" width="32" height="32"/>
                <rect x="0" y="160" width="32" height="32"/>
                <rect x="192" y="160" width="32" height="32"/>
                <rect x="0" y="192" width="32" height="32"/>
                <rect x="32" y="192" width="32" height="32"/>
                <rect x="64" y="192" width="32" height="32"/>
                <rect x="96" y="192" width="32" height="32"/>
                <rect x="128" y="192" width="32" height="32"/>
                <rect x="160" y="192" width="32" height="32"/>
                <rect x="192" y="192" width="32" height="32"/>
                <rect x="32" y="224" width="32" height="32"/>
                <rect x="96" y="224" width="32" height="32"/>
                <rect x="160" y="224" width="32" height="32"/>
              </g>
            </svg>
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
          variant="outline"
          fullWidth
          iconName="RefreshCw"
          iconPosition="left"
          onClick={handleRegenerateClick}
        >
          Régénérer le Code
        </Button>
        <Button
          variant="default"
          fullWidth
          iconName="Download"
          iconPosition="left"
        >
          Télécharger
        </Button>
      </div>
      {showRegenerateConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Régénérer le Code QR ?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cette action générera un nouveau code QR unique. L'ancien code ne sera plus valide pour le pointage.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={handleCancelRegenerate}>
                Annuler
              </Button>
              <Button variant="warning" onClick={handleConfirmRegenerate}>
                Confirmer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;