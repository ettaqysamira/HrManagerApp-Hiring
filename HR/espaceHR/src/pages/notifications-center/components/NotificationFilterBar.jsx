import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const NotificationFilterBar = ({ 
  onFilterChange, 
  onSearch,
  totalCount,
  unreadCount,
  selectedCount 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [readStatus, setReadStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const readStatusOptions = [
    { value: 'all', label: 'Tous les messages' },
    { value: 'unread', label: 'Non lus' },
    { value: 'read', label: 'Lus' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Toutes priorités' },
    { value: 'high', label: 'Haute priorité' },
    { value: 'medium', label: 'Priorité moyenne' },
    { value: 'low', label: 'Priorité basse' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Toutes les dates' },
    { value: 'today', label: "Aujourd\'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'custom', label: 'Période personnalisée' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const filters = { readStatus, priority, dateRange };
    filters[filterType] = value;
    
    if (filterType === 'readStatus') setReadStatus(value);
    if (filterType === 'priority') setPriority(value);
    if (filterType === 'dateRange') setDateRange(value);
    
    onFilterChange(filters);
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Rechercher dans les notifications..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <Button variant="outline" iconName="Filter" size="default">
            Filtres avancés
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select
            options={readStatusOptions}
            value={readStatus}
            onChange={(value) => handleFilterChange('readStatus', value)}
            placeholder="Statut de lecture"
          />
          <Select
            options={priorityOptions}
            value={priority}
            onChange={(value) => handleFilterChange('priority', value)}
            placeholder="Niveau de priorité"
          />
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
            placeholder="Période"
          />
        </div>
      </div>

      <div className="px-4 py-3 bg-muted/50 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            {totalCount} notification{totalCount > 1 ? 's' : ''}
          </span>
          {unreadCount > 0 && (
            <span className="text-accent font-medium">
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </span>
          )}
          {selectedCount > 0 && (
            <span className="text-primary font-medium">
              {selectedCount} sélectionné{selectedCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" iconName="MailOpen">
              Marquer comme lu
            </Button>
            <Button variant="ghost" size="sm" iconName="Archive">
              Archiver
            </Button>
            <Button variant="ghost" size="sm" iconName="Trash2">
              Supprimer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationFilterBar;