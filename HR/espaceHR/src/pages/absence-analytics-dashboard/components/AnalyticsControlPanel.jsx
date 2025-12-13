import React from 'react';
import { Download, FileText, Filter } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsControlPanel = ({ filters, onFilterChange, onExport }) => {
  const handleFilterUpdate = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Panneau de Contrôle Analytique
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          value={filters?.department}
          onChange={(e) => handleFilterUpdate('department', e?.target?.value)}
        >
          <option value="all">Tous les départements</option>
          <option value="it">IT</option>
          <option value="hr">RH</option>
          <option value="finance">Finance</option>
          <option value="sales">Ventes</option>
          <option value="marketing">Marketing</option>
          <option value="operations">Opérations</option>
        </Select>

        <Select
          value={filters?.employeeGroup}
          onChange={(e) => handleFilterUpdate('employeeGroup', e?.target?.value)}
        >
          <option value="all">Tous les groupes</option>
          <option value="full-time">Temps plein</option>
          <option value="part-time">Temps partiel</option>
          <option value="contract">Contractuels</option>
          <option value="intern">Stagiaires</option>
        </Select>

        <Select
          value={filters?.absenceType}
          onChange={(e) => handleFilterUpdate('absenceType', e?.target?.value)}
        >
          <option value="all">Tous les types</option>
          <option value="sick">Congé Maladie</option>
          <option value="annual">Congé Annuel</option>
          <option value="family">Congé Familial</option>
          <option value="training">Formation</option>
          <option value="unpaid">Sans Solde</option>
        </Select>

        <Select
          value={filters?.timePeriod}
          onChange={(e) => handleFilterUpdate('timePeriod', e?.target?.value)}
        >
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois-ci</option>
          <option value="quarter">Ce trimestre</option>
          <option value="year">Cette année</option>
          <option value="custom">Période personnalisée</option>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => onExport('pdf')}
        >
          <FileText size={16} className="mr-2" />
          Export PDF
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onExport('excel')}
        >
          <Download size={16} className="mr-2" />
          Export Excel
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onExport('csv')}
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Dernière mise à jour: Il y a 5 minutes</span>
        <span>•</span>
        <button className="text-primary hover:underline">
          Actualiser les données
        </button>
      </div>
    </div>
  );
};

export default AnalyticsControlPanel;