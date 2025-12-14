import React from 'react';
import Icon from '../../../components/AppIcon';

const SyncStatusCard = ({ syncStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return 'CircleCheck';
      case 'pending':
        return 'Clock';
      case 'error':
        return 'CircleAlert';
      default:
        return 'Circle';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'synced':
        return 'Synchronisé';
      case 'pending':
        return 'En Attente';
      case 'error':
        return 'Erreur';
      default:
        return 'Inconnu';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mt-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">État de Synchronisation</h3>
      <div className="space-y-3">
        {syncStatus?.map((system) => (
          <div key={system?.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${system?.status === 'synced' ? 'bg-success/10' :
                  system?.status === 'pending' ? 'bg-warning/10' :
                    system?.status === 'error' ? 'bg-error/10' : 'bg-muted'
                }`}>
                <Icon
                  name={system?.icon}
                  size={20}
                  color={
                    system?.status === 'synced' ? 'var(--color-success)' :
                      system?.status === 'pending' ? 'var(--color-warning)' :
                        system?.status === 'error' ? 'var(--color-error)' :
                          'var(--color-muted-foreground)'
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{system?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {system?.lastSync ? `Dernière sync: ${formatDate(system?.lastSync)}` : 'Jamais synchronisé'}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(system?.status)}`}>
              <Icon name={getStatusIcon(system?.status)} size={14} />
              <span>{getStatusLabel(system?.status)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Les modifications sont automatiquement synchronisées avec les systèmes connectés dans un délai de 24 heures.
        </p>
      </div>
    </div>
  );
};

export default SyncStatusCard;