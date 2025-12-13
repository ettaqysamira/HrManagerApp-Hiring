import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceHistory = ({ history }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedHistory = showAll ? history : history?.slice(0, 10);

  const getActionIcon = (action) => {
    switch (action) {
      case 'check-in':
        return { name: 'LogIn', color: 'var(--color-success)' };
      case 'check-out':
        return { name: 'LogOut', color: 'var(--color-error)' };
      case 'break-start':
        return { name: 'Coffee', color: 'var(--color-warning)' };
      case 'break-end':
        return { name: 'PlayCircle', color: 'var(--color-accent)' };
      default:
        return { name: 'Clock', color: 'var(--color-muted-foreground)' };
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case 'check-in':
        return 'Arrivée';
      case 'check-out':
        return 'Départ';
      case 'break-start':
        return 'Début Pause';
      case 'break-end':
        return 'Fin Pause';
      default:
        return action;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      time: date?.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const handleExport = () => {
    console.log('Exporting attendance history...');
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Historique de Pointage</h3>
            <p className="text-sm text-muted-foreground">Dernières entrées enregistrées</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
          >
            Exporter
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Heure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Localisation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {displayedHistory?.map((entry) => {
              const iconConfig = getActionIcon(entry?.action);
              const dateTime = formatDateTime(entry?.timestamp);
              return (
                <tr key={entry?.id} className="hover:bg-muted/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {dateTime?.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-foreground">
                    {dateTime?.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Icon name={iconConfig?.name} size={16} color={iconConfig?.color} />
                      <span className="text-sm text-foreground">{getActionLabel(entry?.action)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} />
                      <span>{entry?.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${entry?.verified ? 'badge-success' : 'badge-warning'}`}>
                      {entry?.verified ? 'Vérifié' : 'En attente'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {history?.length > 10 && (
        <div className="p-4 border-t border-border text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {showAll ? 'Voir moins' : `Voir tout (${history?.length} entrées)`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;