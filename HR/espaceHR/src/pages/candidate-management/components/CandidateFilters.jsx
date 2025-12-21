import React from 'react';
import { Download, Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select2";
import Input from '../../../components/ui/Input';

const CandidateFilters = ({ filters, onFilterChange, onExport, positions = [] }) => {
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
                placeholder="Rechercher par compétence (ex: Java, React)..."
                className="pl-10"
                value={filters?.skill || ''}
                onChange={(e) => handleFilterUpdate('skill', e.target.value)}
              />
            </div>
          </div>

          <div className="sm:w-48">
            <Select
              value={filters?.position}
              onValueChange={(value) => handleFilterUpdate('position', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les postes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les postes</SelectItem>
                {positions.map(pos => (
                  <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:w-48">
            <Select
              value={filters?.status}
              onValueChange={(value) => handleFilterUpdate('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Nouveau">Nouveau</SelectItem>
                <SelectItem value="Accepté">Accepté</SelectItem>
                <SelectItem value="Rejeté">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:w-48">
            <Select
              value={filters?.source}
              onValueChange={(value) => handleFilterUpdate('source', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sources</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="career-site">Site Carrières</SelectItem>
                <SelectItem value="referral">Référence</SelectItem>
                <SelectItem value="recruitment-agency">Agence de Recrutement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:w-48">
            <Select
              value={filters?.dateRange}
              onValueChange={(value) => handleFilterUpdate('dateRange', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les dates</SelectItem>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois-ci</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>
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