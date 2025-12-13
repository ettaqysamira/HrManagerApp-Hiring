import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const leaveTypeOptions = [
    { value: 'all', label: 'Tous les types' },
    { value: 'vacation', label: 'Congés payés' },
    { value: 'sick', label: 'Maladie' },
    { value: 'personal', label: 'Personnel' },
    { value: 'parental', label: 'Parental' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente' },
    { value: 'approved', label: 'Approuvé' },
    { value: 'rejected', label: 'Rejeté' },
  ];

  const departmentOptions = [
    { value: 'all', label: 'Tous les départements' },
    { value: 'it', label: 'Informatique' },
    { value: 'hr', label: 'Ressources Humaines' },
    { value: 'finance', label: 'Finance' },
    { value: 'sales', label: 'Ventes' },
    { value: 'marketing', label: 'Marketing' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Filtres</h3>
        <Button
          variant="ghost"
          size="xs"
          iconName="RotateCcw"
          onClick={onReset}
        >
          Réinitialiser
        </Button>
      </div>
      <Input
        type="search"
        placeholder="Rechercher un employé..."
        value={filters?.search}
        onChange={(e) => onFilterChange('search', e?.target?.value)}
        className="mb-4"
      />
      <Select
        label="Type de congé"
        options={leaveTypeOptions}
        value={filters?.leaveType}
        onChange={(value) => onFilterChange('leaveType', value)}
        className="mb-4"
      />
      <Select
        label="Statut"
        options={statusOptions}
        value={filters?.status}
        onChange={(value) => onFilterChange('status', value)}
        className="mb-4"
      />
      <Select
        label="Département"
        options={departmentOptions}
        value={filters?.department}
        onChange={(value) => onFilterChange('department', value)}
        className="mb-4"
      />
      <div className="border-t border-border pt-4">
        <p className="text-xs font-medium text-foreground mb-3">
          Plage de dates
        </p>
        <Input
          type="date"
          label="Date début"
          value={filters?.startDate}
          onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          className="mb-3"
        />
        <Input
          type="date"
          label="Date fin"
          value={filters?.endDate}
          onChange={(e) => onFilterChange('endDate', e?.target?.value)}
        />
      </div>
      <div className="border-t border-border pt-4">
        <p className="text-xs font-medium text-foreground mb-3">Options</p>
        <Checkbox
          label="Afficher uniquement mes demandes"
          checked={filters?.myRequestsOnly}
          onChange={(e) =>
            onFilterChange('myRequestsOnly', e?.target?.checked)
          }
          className="mb-2"
        />
        <Checkbox
          label="Afficher les conflits"
          checked={filters?.showConflicts}
          onChange={(e) => onFilterChange('showConflicts', e?.target?.checked)}
        />
      </div>
    </div>
  );
};

export default FilterPanel;