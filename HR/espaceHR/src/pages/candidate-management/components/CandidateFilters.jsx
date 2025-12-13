import React from 'react';
import { Download, Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CandidateFilters = ({ filters, onFilterChange, onExport }) => {
  const handleFilterUpdate = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="card-elevated p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Rechercher un candidat..."
                className="pl-10"
              />
            </div>
          </div>

          <Select
            value={filters?.position}
            onChange={(e) => handleFilterUpdate('position', e?.target?.value)}
            className="sm:w-48"
          >
            <option value="all">Tous les postes</option>
            <option value="fullstack">Développeur Full Stack</option>
            <option value="project-manager">Chef de Projet</option>
            <option value="ux-designer">Designer UX/UI</option>
            <option value="data-analyst">Analyste de Données</option>
            <option value="mobile-dev">Développeur Mobile</option>
            <option value="devops">DevOps Engineer</option>
          </Select>

          <Select
            value={filters?.status}
            onChange={(e) => handleFilterUpdate('status', e?.target?.value)}
            className="sm:w-48"
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="screening">Screening Initial</option>
            <option value="interview-hr">Entretien RH</option>
            <option value="interview-tech">Entretien Technique</option>
            <option value="interview-final">Entretien Final</option>
            <option value="offer-sent">Offre Envoyée</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Rejeté</option>
          </Select>

          <Select
            value={filters?.source}
            onChange={(e) => handleFilterUpdate('source', e?.target?.value)}
            className="sm:w-48"
          >
            <option value="all">Toutes les sources</option>
            <option value="linkedin">LinkedIn</option>
            <option value="indeed">Indeed</option>
            <option value="career-site">Site Carrières</option>
            <option value="referral">Référence</option>
            <option value="recruitment-agency">Agence de Recrutement</option>
          </Select>

          <Select
            value={filters?.dateRange}
            onChange={(e) => handleFilterUpdate('dateRange', e?.target?.value)}
            className="sm:w-48"
          >
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois-ci</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onExport}>
            <Download size={18} className="mr-2" />
            Exporter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateFilters;