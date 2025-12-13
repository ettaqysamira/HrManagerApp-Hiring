import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = ({ onManualEntry }) => {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualEntryData, setManualEntryData] = useState({
    date: '',
    checkIn: '',
    checkOut: '',
    reason: ''
  });

  const handleManualEntrySubmit = (e) => {
    e?.preventDefault();
    onManualEntry(manualEntryData);
    setShowManualEntry(false);
    setManualEntryData({
      date: '',
      checkIn: '',
      checkOut: '',
      reason: ''
    });
  };

  const handleInputChange = (field, value) => {
    setManualEntryData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const quickActionButtons = [
    {
      id: 'manual-entry',
      label: 'Saisie Manuelle',
      icon: 'Edit',
      variant: 'outline',
      onClick: () => setShowManualEntry(true)
    },
    {
      id: 'view-schedule',
      label: 'Mon Horaire',
      icon: 'Calendar',
      variant: 'outline',
      onClick: () => console.log('View schedule')
    },
    {
      id: 'report-issue',
      label: 'Signaler un Problème',
      icon: 'AlertCircle',
      variant: 'outline',
      onClick: () => console.log('Report issue')
    }
  ];

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Actions Rapides</h3>
        <div className="space-y-3">
          {quickActionButtons?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
            >
              {action?.label}
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
            
          </div>
        </div>
      </div>
      {showManualEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Saisie Manuelle de Pointage</h3>
                <button
                  onClick={() => setShowManualEntry(false)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors duration-150"
                  aria-label="Fermer"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleManualEntrySubmit} className="p-6 space-y-4">
              <Input
                type="date"
                label="Date"
                required
                value={manualEntryData?.date}
                onChange={(e) => handleInputChange('date', e?.target?.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="time"
                  label="Heure d'Arrivée"
                  required
                  value={manualEntryData?.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e?.target?.value)}
                />

                <Input
                  type="time"
                  label="Heure de Départ"
                  value={manualEntryData?.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e?.target?.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Motif de la Saisie Manuelle
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  rows="3"
                  placeholder="Expliquez pourquoi vous effectuez une saisie manuelle..."
                  required
                  value={manualEntryData?.reason}
                  onChange={(e) => handleInputChange('reason', e?.target?.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowManualEntry(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="default" fullWidth>
                  Soumettre
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;