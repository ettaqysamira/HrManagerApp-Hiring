import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ onFilterChange, onSavePreset, savedPresets = [] }) => {
  const [filters, setFilters] = useState({
    status: '',
    leaveType: '',
    dateRange: '',
    approvalStage: ''
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'approved', label: 'Approuvé' },
    { value: 'pending', label: 'En attente' },
    { value: 'rejected', label: 'Rejeté' }
  ];
  
  const leaveTypeOptions = [
    { value: '', label: 'Tous les types' },
    { value: 'conges_payes', label: 'Congés Payés' },
    { value: 'conges_maladie', label: 'Congés Maladie' },
    { value: 'conges_sans_solde', label: 'Congés Sans Solde' },
    { value: 'conges_formation', label: 'Congés Formation' }
  ];
  
  const dateRangeOptions = [
    { value: '', label: 'Toutes les dates' },
    { value: 'today', label: "Aujourd\'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' }
  ];
  
  const approvalStageOptions = [
    { value: '', label: 'Toutes les étapes' },
    { value: 'manager', label: 'Manager' },
    { value: 'hr', label: 'RH' },
    { value: 'director', label: 'Directeur' }
  ];
  
  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleReset = () => {
    const resetFilters = {
      status: '',
      leaveType: '',
      dateRange: '',
      approvalStage: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  const handleSavePreset = () => {
    const presetName = prompt('Nom du filtre prédéfini:');
    if (presetName) {
      onSavePreset({ name: presetName, filters });
    }
  };
  
  const activeFilterCount = Object.values(filters)?.filter(v => v !== '')?.length;
  
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <span className="font-semibold text-foreground">Filtres Avancés</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </div>
        <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
      </button>
      {isExpanded && (
        <div className="p-6 border-t border-border space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Statut"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <Select
              label="Type de Congé"
              options={leaveTypeOptions}
              value={filters?.leaveType}
              onChange={(value) => handleFilterChange('leaveType', value)}
            />
            
            <Select
              label="Période"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
            
            <Select
              label="Étape d'Approbation"
              options={approvalStageOptions}
              value={filters?.approvalStage}
              onChange={(value) => handleFilterChange('approvalStage', value)}
            />
          </div>
          
          {savedPresets?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Filtres Prédéfinis
              </label>
              <div className="flex flex-wrap gap-2">
                {savedPresets?.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFilters(preset?.filters);
                      onFilterChange(preset?.filters);
                    }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors duration-200"
                  >
                    {preset?.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              iconName="RotateCcw"
              onClick={handleReset}
            >
              Réinitialiser
            </Button>
            <Button
              variant="secondary"
              iconName="Save"
              onClick={handleSavePreset}
            >
              Enregistrer le Filtre
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;