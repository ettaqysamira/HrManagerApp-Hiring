import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationItem = ({ notification, onMarkAsRead, onAction }) => {
  const getPriorityColor = () => {
    switch (notification?.priority) {
      case 'high':
        return 'bg-error/10 border-error/20';
      case 'medium':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const getIconByType = () => {
    switch (notification?.type) {
      case 'leave':
        return 'Calendar';
      case 'document':
        return 'FileText';
      case 'training':
        return 'GraduationCap';
      case 'attendance':
        return 'Clock';
      case 'system':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return notifDate?.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
        notification?.isRead ? 'bg-card' : getPriorityColor()
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          notification?.isRead ? 'bg-muted' : 'bg-primary/10'
        }`}>
          <Icon 
            name={getIconByType()} 
            size={20} 
            color={notification?.isRead ? 'var(--color-muted-foreground)' : 'var(--color-primary)'} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`text-sm font-medium ${
              notification?.isRead ? 'text-muted-foreground' : 'text-foreground'
            }`}>
              {notification?.title}
            </h4>
            {!notification?.isRead && (
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {notification?.message}
          </p>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              {formatTime(notification?.timestamp)}
            </span>
            
            <div className="flex items-center gap-2">
              {notification?.actionLabel && (
                <button
                  onClick={() => onAction(notification)}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  {notification?.actionLabel}
                </button>
              )}
              {!notification?.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification?.id)}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Marquer comme lu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;