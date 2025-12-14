import React from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatus = ({ integrations }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'synced':
        return {
          icon: 'CheckCircle',
          color: 'var(--color-success)',
          bgColor: 'bg-success/10',
          label: 'Synchronisé',
          badgeClass: 'badge-success'
        };
      case 'syncing':
        return {
          icon: 'RefreshCw',
          color: 'var(--color-accent)',
          bgColor: 'bg-accent/10',
          label: 'En cours',
          badgeClass: 'badge-info'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'var(--color-warning)',
          bgColor: 'bg-warning/10',
          label: 'En attente',
          badgeClass: 'badge-warning'
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          color: 'var(--color-error)',
          bgColor: 'bg-error/10',
          label: 'Erreur',
          badgeClass: 'badge-error'
        };
      default:
        return {
          icon: 'HelpCircle',
          color: 'var(--color-muted-foreground)',
          bgColor: 'bg-muted',
          label: 'Inconnu',
          badgeClass: 'badge-info'
        };
    }
  };

  const formatLastSync = (dateString) => {
    if (!dateString) return 'Jamais';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffMins < 1440) return `Il y a ${Math.floor(diffMins / 60)} h`;
    return date?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">État des Intégrations</h3>
        <p className="text-sm text-muted-foreground">Synchronisation avec les systèmes RH</p>
      </div>
      <div className="p-6 space-y-4">
        {integrations?.map((integration) => {
          const statusConfig = getStatusConfig(integration?.status);
          return (
            <div
              key={integration?.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-150"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg ${statusConfig?.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={integration?.icon} size={24} color={statusConfig?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{integration?.name}</h4>
                    <span className={`badge ${statusConfig?.badgeClass}`}>
                      {statusConfig?.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{integration?.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>Dernière sync: {formatLastSync(integration?.lastSync)}</span>
                    </div>
                    {integration?.pendingRecords > 0 && (
                      <div className="flex items-center gap-1">
                        <Icon name="Database" size={12} />
                        <span>{integration?.pendingRecords} en attente</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="ml-4 p-2 rounded-lg hover:bg-background transition-colors duration-150"
                aria-label={`Synchroniser ${integration?.name}`}
              >
                <Icon name="RefreshCw" size={16} color="var(--color-muted-foreground)" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Synchronisation automatique toutes les 15 minutes</span>
          </div>
          <button className="text-primary hover:text-primary/80 font-medium transition-colors duration-150">
            Configurer
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;