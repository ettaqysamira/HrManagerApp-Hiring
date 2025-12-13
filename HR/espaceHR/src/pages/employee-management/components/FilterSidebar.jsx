import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ isCollapsed, onToggle, filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    department: true,
    status: true,
    location: true,
    savedSearches: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

 

  const departments = [
    { id: 'it', label: 'Informatique & Digital', count: 48 },
    { id: 'hr', label: 'Ressources Humaines', count: 15 },
    { id: 'finance', label: 'Finance & Comptabilité', count: 22 },
    { id: 'marketing', label: 'Marketing & Communication', count: 19 },
    { id: 'sales', label: 'Commercial & Ventes', count: 31 },
    { id: 'logistics', label: 'Logistique', count: 14 }
  ];

  const statuses = [
    { id: 'active', label: 'Actif', count: 128, color: 'text-success' },
    { id: 'leave', label: 'En Congé', count: 9, color: 'text-warning' },
    { id: 'probation', label: 'Période d’Essai', count: 6, color: 'text-accent' },
    { id: 'suspended', label: 'Suspendu', count: 2, color: 'text-error' },
    { id: 'inactive', label: 'Inactif', count: 4, color: 'text-muted-foreground' }
  ];

  const locations = [
    { id: 'casablanca', label: 'Casablanca', count: 72 },
    { id: 'rabat', label: 'Rabat', count: 29 },
    { id: 'tanger', label: 'Tanger', count: 18 },
    { id: 'marrakech', label: 'Marrakech', count: 21 },
    { id: 'fes', label: 'Fès', count: 12 },
    { id: 'remote', label: 'Télétravail', count: 19 }
  ];

  const savedSearches = [
    { id: 'recent', label: 'Nouvelles Recrues', icon: 'Clock' },
    { id: 'contracts', label: 'Contrats à Renouveler', icon: 'AlertCircle' },
    { id: 'managers', label: 'Cadres & Managers', icon: 'Users' },
    { id: 'remote', label: 'Employés en Télétravail', icon: 'Laptop' }
  ];

  return (
    <aside
      className={`fixed top-16 left-64 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-200 ${
        isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
      } z-20`}
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Filtres</h2>
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-accent/10 transition-colors"
            aria-label="Réduire les filtres"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
        </div>

        <div className="p-4 space-y-6">

          <div>
            <button
              onClick={() => toggleSection('savedSearches')}
              className="w-full flex items-center justify-between mb-3"
            >
              <span className="text-sm font-medium text-foreground">
                Recherches Enregistrées
              </span>
              <Icon
                name={expandedSections.savedSearches ? 'ChevronDown' : 'ChevronRight'}
                size={16}
              />
            </button>

            {expandedSections.savedSearches && (
              <div className="space-y-2">
                {savedSearches.map(search => (
                  <button
                    key={search.id}
                    onClick={() => onFilterChange('savedSearch', search.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors text-left"
                  >
                    <Icon name={search.icon} size={16} />
                    <span className="text-sm text-foreground">{search.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('department')}
              className="w-full flex items-center justify-between mb-3"
            >
              <span className="text-sm font-medium text-foreground">Département</span>
              <Icon
                name={expandedSections.department ? 'ChevronDown' : 'ChevronRight'}
                size={16}
              />
            </button>

            {expandedSections.department && (
              <div className="space-y-2">
                {departments.map(dept => (
                  <Checkbox
                    key={dept.id}
                    label={
                      <div className="flex justify-between w-full">
                        <span>{dept.label}</span>
                        <span className="text-xs text-muted-foreground">{dept.count}</span>
                      </div>
                    }
                    checked={filters?.departments?.includes(dept.id)}
                    onChange={(e) =>
                      onFilterChange('department', dept.id, e.target.checked)
                    }
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('status')}
              className="w-full flex items-center justify-between mb-3"
            >
              <span className="text-sm font-medium text-foreground">Statut</span>
              <Icon
                name={expandedSections.status ? 'ChevronDown' : 'ChevronRight'}
                size={16}
              />
            </button>

            {expandedSections.status && (
              <div className="space-y-2">
                {statuses.map(status => (
                  <Checkbox
                    key={status.id}
                    label={
                      <div className="flex justify-between w-full">
                        <span className={status.color}>{status.label}</span>
                        <span className="text-xs text-muted-foreground">{status.count}</span>
                      </div>
                    }
                    checked={filters?.statuses?.includes(status.id)}
                    onChange={(e) =>
                      onFilterChange('status', status.id, e.target.checked)
                    }
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('location')}
              className="w-full flex items-center justify-between mb-3"
            >
              <span className="text-sm font-medium text-foreground">Localisation</span>
              <Icon
                name={expandedSections.location ? 'ChevronDown' : 'ChevronRight'}
                size={16}
              />
            </button>

            {expandedSections.location && (
              <div className="space-y-2">
                {locations.map(location => (
                  <Checkbox
                    key={location.id}
                    label={
                      <div className="flex justify-between w-full">
                        <span>{location.label}</span>
                        <span className="text-xs text-muted-foreground">{location.count}</span>
                      </div>
                    }
                    checked={filters?.locations?.includes(location.id)}
                    onChange={(e) =>
                      onFilterChange('location', location.id, e.target.checked)
                    }
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              fullWidth
              onClick={() => onFilterChange('reset')}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
