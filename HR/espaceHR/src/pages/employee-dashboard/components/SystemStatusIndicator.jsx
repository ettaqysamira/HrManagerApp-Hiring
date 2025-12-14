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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle2';
      case 'degraded':
        return 'AlertCircle';
      case 'down':
        return 'XCircle';
      default:
        return 'HelpCircle';
    }
  };

  const getStatusLabel = (status) => {
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
    <div className="flex items-center gap-6 px-6 py-3 bg-muted/50 rounded-lg border border-border">
      <span className="text-xs font-medium text-muted-foreground">État des systèmes:</span>
      <div className="flex items-center gap-4">
        {systems?.map((system) => (
          <div key={system?.id} className="flex items-center gap-2">
            <Icon 
              name={getStatusIcon(system?.status)} 
              size={16} 
              className={getStatusColor(system?.status)} 
            />
            <span className="text-xs text-foreground">{system?.name}</span>
            <span className={`text-xs font-medium ${getStatusColor(system?.status)}`}>
              {getStatusLabel(system?.status)}
            </span>
          </div>
        ))}
      </div>
      <div className="ml-auto text-xs text-muted-foreground">
        Dernière sync: {new Date()?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default SystemStatusIndicator;