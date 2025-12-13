import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusIndicator = ({ systems }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-success';
      case 'degraded':
        return 'text-warning';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-success/10';
      case 'degraded':
        return 'bg-warning/10';
      case 'down':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return 'Opérationnel';
      case 'degraded':
        return 'Dégradé';
      case 'down':
        return 'Hors ligne';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">État des Systèmes</h3>
      <div className="space-y-3">
        {systems?.map((system, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${getStatusBg(system?.status)} flex items-center justify-center`}>
                <Icon 
                  name={system?.status === 'operational' ? 'CheckCircle' : system?.status === 'degraded' ? 'AlertCircle' : 'XCircle'} 
                  size={16} 
                  color={`var(--color-${system?.status === 'operational' ? 'success' : system?.status === 'degraded' ? 'warning' : 'error'})`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{system?.name}</p>
                <p className="text-xs text-muted-foreground">Dernière sync: {system?.lastSync}</p>
              </div>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(system?.status)}`}>
              {getStatusText(system?.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatusIndicator;