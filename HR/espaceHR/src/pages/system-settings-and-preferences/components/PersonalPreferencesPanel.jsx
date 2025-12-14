import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalPreferencesPanel = ({ preferences, onSave }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  const languageOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' }
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2025)' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2025)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2025-12-31)' }
  ];

  const timeFormatOptions = [
    { value: '24h', label: '24 heures (14:30)' },
    { value: '12h', label: '12 heures (2:30 PM)' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'auto', label: 'Automatique' }
  ];

  const dashboardLayoutOptions = [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Confortable' },
    { value: 'spacious', label: 'Spacieux' }
  ];

  const handleChange = (field, value) => {
    setLocalPreferences({ ...localPreferences, [field]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(localPreferences);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Langue de l'interface"
          description="Choisissez la langue d'affichage"
          options={languageOptions}
          value={localPreferences?.language}
          onChange={(value) => handleChange('language', value)}
        />

        <Select
          label="Format de date"
          description="Format d'affichage des dates"
          options={dateFormatOptions}
          value={localPreferences?.dateFormat}
          onChange={(value) => handleChange('dateFormat', value)}
        />

        <Select
          label="Format d'heure"
          description="Format d'affichage de l'heure"
          options={timeFormatOptions}
          value={localPreferences?.timeFormat}
          onChange={(value) => handleChange('timeFormat', value)}
        />

        <Select
          label="Thème"
          description="Apparence de l'interface"
          options={themeOptions}
          value={localPreferences?.theme}
          onChange={(value) => handleChange('theme', value)}
        />

        <Select
          label="Disposition du tableau de bord"
          description="Densité d'affichage des informations"
          options={dashboardLayoutOptions}
          value={localPreferences?.dashboardLayout}
          onChange={(value) => handleChange('dashboardLayout', value)}
          className="md:col-span-2"
        />
      </div>
      <div className="bg-muted rounded-lg p-4 border border-border">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Aperçu en temps réel</p>
            <p className="text-xs text-muted-foreground mt-1">
              Les modifications seront appliquées immédiatement après la sauvegarde
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

export default PersonalPreferencesPanel;