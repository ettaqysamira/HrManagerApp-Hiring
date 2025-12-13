import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ onFilterChange, onExport }) => {
  const [dateRange, setDateRange] = useState('month');
  const [department, setDepartment] = useState('all');

  const dateRangeOptions = [
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' },
    { value: 'custom', label: 'Personnalisé' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'Tous les départements' },
    { value: 'it', label: 'Informatique' },
    { value: 'hr', label: 'Ressources Humaines' },
    { value: 'finance', label: 'Finance' },
    { value: 'sales', label: 'Ventes' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    onFilterChange({ dateRange: value, department });
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
    onFilterChange({ dateRange, department: value });
  };

  return (
    <div className="card-elevated p-4 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder="Période"
            className="w-full sm:w-48"
          />
          <Select
            options={departmentOptions}
            value={department}
            onChange={handleDepartmentChange}
            placeholder="Département"
            className="w-full sm:w-56"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="default"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => {
              setDateRange('month');
              setDepartment('all');
              onFilterChange({ dateRange: 'month', department: 'all' });
            }}
          >
            Réinitialiser
          </Button>
          <Button
            variant="default"
            size="default"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Exporter PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;