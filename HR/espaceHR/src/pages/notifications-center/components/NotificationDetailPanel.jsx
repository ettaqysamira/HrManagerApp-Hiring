import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const NotificationDetailPanel = ({ 
  notification, 
  onMarkAsRead, 
  onArchive, 
  onDelete 
}) => {
  if (!notification) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <Icon name="Mail" size={64} color="var(--color-muted-foreground)" className="mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Aucune notification sélectionnée
        </h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez une notification pour voir les détails
        </p>
      </div>
    );
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { label: 'Haute priorité', className: 'badge-error' },
      medium: { label: 'Priorité moyenne', className: 'badge-warning' },
      low: { label: 'Priorité basse', className: 'badge-info' }
    };
    return badges?.[priority] || badges?.low;
  };

  const priorityBadge = getPriorityBadge(notification?.priority);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-foreground flex-1">
            {notification?.subject}
          </h2>
          <span className={`badge ${priorityBadge?.className}`}>
            {priorityBadge?.label}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Icon name="User" size={16} />
            <span>{notification?.sender}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} />
            <span>{format(notification?.timestamp, 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={notification?.isRead ? "outline" : "default"}
            size="sm"
            iconName={notification?.isRead ? "Mail" : "MailOpen"}
            onClick={onMarkAsRead}
          >
            {notification?.isRead ? 'Marquer non lu' : 'Marquer comme lu'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Archive"
            onClick={onArchive}
          >
            Archiver
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={onDelete}
          >
            Supprimer
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground whitespace-pre-wrap leading-relaxed">
            {notification?.content}
          </p>
        </div>

        {notification?.attachments && notification?.attachments?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Paperclip" size={16} />
              Pièces jointes ({notification?.attachments?.length})
            </h3>
            <div className="space-y-2">
              {notification?.attachments?.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {attachment?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attachment?.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" iconName="Download">
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {notification?.relatedActions && notification?.relatedActions?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Actions suggérées
            </h3>
            <div className="space-y-2">
              {notification?.relatedActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  fullWidth
                  iconName={action?.icon}
                  iconPosition="left"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDetailPanel;