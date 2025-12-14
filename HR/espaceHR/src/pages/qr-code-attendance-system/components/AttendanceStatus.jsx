import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStatus = ({ status, lastCheckIn, lastCheckOut }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'checked-in':
        return {
          icon: 'CheckCircle',
          color: 'var(--color-success)',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'Présent',
          message: 'Vous êtes actuellement pointé'
        };
      case 'checked-out':
        return {
          icon: 'XCircle',
          color: 'var(--color-muted-foreground)',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          label: 'Absent',
          message: 'Vous avez terminé votre journée'
        };
      case 'on-break':
        return {
          icon: 'Coffee',
          color: 'var(--color-warning)',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'En Pause',
          message: 'Pause en cours'
        };
      default:
        return {
          icon: 'Clock',
          color: 'var(--color-muted-foreground)',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          label: 'Non Pointé',
          message: 'Aucun pointage aujourd\'hui'
        };
    }
  };

  const config = getStatusConfig();

  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    const date = new Date(dateString);
    return date?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-card rounded-lg border ${config?.borderColor} p-6`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-full ${config?.bgColor} flex items-center justify-center`}>
          <Icon name={config?.icon} size={32} color={config?.color} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{config?.label}</h3>
          <p className="text-sm text-muted-foreground">{config?.message}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="LogIn" size={16} color="var(--color-success)" />
            <span className="text-xs font-medium text-muted-foreground">Arrivée</span>
          </div>
          <p className="text-2xl font-bold text-foreground font-mono">{formatTime(lastCheckIn)}</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="LogOut" size={16} color="var(--color-error)" />
            <span className="text-xs font-medium text-muted-foreground">Départ</span>
          </div>
          <p className="text-2xl font-bold text-foreground font-mono">{formatTime(lastCheckOut)}</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatus;