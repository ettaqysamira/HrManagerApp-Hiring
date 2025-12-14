import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationSettingsPanel = ({ settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const frequencyOptions = [
    { value: 'instant', label: 'Instantané' },
    { value: 'hourly', label: 'Toutes les heures' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Toutes les priorités' },
    { value: 'high', label: 'Haute priorité uniquement' },
    { value: 'critical', label: 'Critique uniquement' }
  ];

  const handleCheckboxChange = (category, channel, checked) => {
    setLocalSettings({
      ...localSettings,
      [category]: {
        ...localSettings?.[category],
        [channel]: checked
      }
    });
    setHasChanges(true);
  };

  const handleFrequencyChange = (value) => {
    setLocalSettings({ ...localSettings, frequency: value });
    setHasChanges(true);
  };

  const handlePriorityChange = (value) => {
    setLocalSettings({ ...localSettings, priority: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  const notificationCategories = [
    {
      id: 'leave',
      label: 'Demandes de congés',
      description: 'Notifications sur vos demandes de congés'
    },
    {
      id: 'documents',
      label: 'Nouveaux documents',
      description: 'Alertes pour les nouveaux documents disponibles'
    },
    {
      id: 'training',
      label: 'Formation',
      description: 'Rappels et mises à jour de formation'
    },
    {
      id: 'attendance',
      label: 'Pointage',
      description: 'Alertes de pointage et anomalies'
    },
    {
      id: 'system',
      label: 'Système',
      description: 'Mises à jour et maintenance du système'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Fréquence des notifications"
          description="À quelle fréquence recevoir les notifications groupées"
          options={frequencyOptions}
          value={localSettings?.frequency}
          onChange={handleFrequencyChange}
        />

        <Select
          label="Seuil de priorité"
          description="Niveau minimum de priorité pour les notifications"
          options={priorityOptions}
          value={localSettings?.priority}
          onChange={handlePriorityChange}
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Canaux de notification par catégorie</h3>
        
        {notificationCategories?.map((category) => (
          <div key={category?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="mb-3">
              <h4 className="text-sm font-medium text-foreground">{category?.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{category?.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Checkbox
                label="Email"
                checked={localSettings?.[category?.id]?.email || false}
                onChange={(e) => handleCheckboxChange(category?.id, 'email', e?.target?.checked)}
              />
              <Checkbox
                label="SMS"
                checked={localSettings?.[category?.id]?.sms || false}
                onChange={(e) => handleCheckboxChange(category?.id, 'sms', e?.target?.checked)}
              />
              <Checkbox
                label="Application"
                checked={localSettings?.[category?.id]?.inApp || false}
                onChange={(e) => handleCheckboxChange(category?.id, 'inApp', e?.target?.checked)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Notifications critiques</p>
            <p className="text-xs text-muted-foreground mt-1">
              Les notifications critiques de sécurité et de conformité seront toujours envoyées, indépendamment de vos préférences
            </p>
          </div>
        </div>
      </div>
      {hasChanges && (
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleReset}>
            Annuler
          </Button>
          <Button variant="default" onClick={handleSave} iconName="Save" iconPosition="left">
            Enregistrer les modifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationSettingsPanel;