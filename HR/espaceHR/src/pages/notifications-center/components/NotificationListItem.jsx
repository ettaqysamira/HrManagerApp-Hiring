import React from 'react';
import Icon from '../../../components/AppIcon';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const NotificationListItem = ({ 
  notification, 
  isSelected, 
  onClick 
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'AlertTriangle';
      default:
        return 'Info';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-border cursor-pointer transition-all duration-200 ${
        isSelected ? 'bg-accent/10' : 'hover:bg-muted'
      } ${!notification?.isRead ? 'bg-primary/5' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${getPriorityColor(notification?.priority)}`}>
          <Icon name={getPriorityIcon(notification?.priority)} size={18} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`text-sm font-semibold ${!notification?.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
              {notification?.subject}
            </h4>
            {!notification?.isRead && (
              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2">
            {notification?.sender}
          </p>
          
          <p className={`text-sm line-clamp-2 mb-2 ${!notification?.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
            {notification?.preview}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {format(notification?.timestamp, 'dd MMM yyyy HH:mm', { locale: fr })}
            </span>
            
            <div className="flex items-center gap-2">
              {notification?.hasAttachment && (
                <Icon name="Paperclip" size={14} className="text-muted-foreground" />
              )}
              {notification?.requiresAction && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
                  Action requise
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationListItem;