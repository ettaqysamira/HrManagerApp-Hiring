import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContractFilters = ({ filters, onFilterChange, onReset, onApply }) => {
  const contractTypeOptions = [
    { value: 'all', label: 'Tous les types' },
    { value: 'cdi', label: 'CDI (Contrat à Durée Indéterminée)' },
    { value: 'cdd', label: 'CDD (Contrat à Durée Déterminée)' },
    { value: 'stage', label: 'Stage' },
    { value: 'alternance', label: 'Alternance' },
    { value: 'interim', label: 'Intérim' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'Tous les départements' },
    { value: 'it', label: 'Informatique' },
    { value: 'hr', label: 'Ressources Humaines' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Ventes' },
    { value: 'operations', label: 'Opérations' }
  ];

  const savedFilterOptions = [
    { value: 'none', label: 'Aucun filtre sauvegardé' },
    { value: 'expiring_30', label: 'Expire dans 30 jours' },
    { value: 'expiring_60', label: 'Expire dans 60 jours' },
    { value: 'expiring_90', label: 'Expire dans 90 jours' },
    { value: 'pending_renewal', label: 'Renouvellements en attente' },
    { value: 'high_salary', label: 'Salaires élevés (>60k€)' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filtres de recherche</h3>
        <Button variant="ghost" size="sm" onClick={onReset} iconName="RotateCcw">
          Réinitialiser
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Type de contrat"
          options={contractTypeOptions}
          value={filters?.contractType}
          onChange={(value) => onFilterChange('contractType', value)}
        />

        <Select
          label="Département"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange('department', value)}
        />

        <Input
          label="Date de début"
          type="date"
          value={filters?.startDate}
          onChange={(e) => onFilterChange('startDate', e?.target?.value)}
        />

        <Input
          label="Date de fin"
          type="date"
          value={filters?.endDate}
          onChange={(e) => onFilterChange('endDate', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          label="Filtres sauvegardés"
          options={savedFilterOptions}
          value={filters?.savedFilter}
          onChange={(value) => onFilterChange('savedFilter', value)}
        />

        <Input
          label="Rechercher par nom"
          type="search"
          placeholder="Nom de l'employé..."
          value={filters?.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e?.target?.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button variant="default" onClick={onApply} iconName="Search">
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};

export default ContractFilters;