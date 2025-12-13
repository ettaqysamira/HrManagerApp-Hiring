import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeaveDetailsPanel = ({ request, onClose, onApprove, onReject }) => {
  if (!request) {
    return (
      <div className="card-elevated p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <Icon
            name="Calendar"
            size={48}
            color="var(--color-muted-foreground)"
          />
          <p className="text-sm text-muted-foreground mt-4">
            Sélectionnez une demande pour voir les détails
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      approved: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-error/10 text-error border-error/20',
    };
    return colors?.[status] || colors?.pending;
  };

  return (
    <div className="card-elevated p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Détails de la demande
        </h3>
        <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Image
            src={request?.employeeAvatar}
            alt={request?.employeeAvatarAlt}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="text-base font-medium text-foreground">
              {request?.employeeName}
            </h4>
            <p className="text-sm text-muted-foreground">
              {request?.department}
            </p>
            <p className="text-xs text-muted-foreground">{request?.position}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <p className="text-sm font-medium text-foreground">
                {request?.typeLabel}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Statut</p>
              <span
                className={`inline-block text-xs font-medium px-2 py-1 rounded border ${getStatusColor(
                  request?.status
                )}`}
              >
                {request?.status === 'pending' && 'En attente'}
                {request?.status === 'approved' && 'Approuvé'}
                {request?.status === 'rejected' && 'Rejeté'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date début</p>
              <p className="text-sm font-medium text-foreground">
                {request?.startDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date fin</p>
              <p className="text-sm font-medium text-foreground">
                {request?.endDate}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">Durée</p>
            <p className="text-sm font-medium text-foreground">
              {request?.duration} jours ouvrables
            </p>
          </div>

          {request?.reason && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">Motif</p>
              <p className="text-sm text-foreground">{request?.reason}</p>
            </div>
          )}

          {request?.attachments && request?.attachments?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">
                Pièces jointes
              </p>
              <div className="space-y-2">
                {request?.attachments?.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                  >
                    <Icon
                      name="Paperclip"
                      size={16}
                      color="var(--color-muted-foreground)"
                    />
                    <span className="text-xs text-foreground flex-1">
                      {attachment?.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Download"
                      onClick={() => console.log('Download', attachment?.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">
              Date de soumission
            </p>
            <p className="text-sm text-foreground">{request?.submittedDate}</p>
          </div>

          {request?.approverComments && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">
                Commentaires du manager
              </p>
              <div className="p-3 rounded-md bg-muted/50">
                <p className="text-sm text-foreground">
                  {request?.approverComments}
                </p>
              </div>
            </div>
          )}
        </div>

        {request?.status === 'pending' && (
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="success"
              iconName="Check"
              iconPosition="left"
              onClick={() => onApprove(request?.id)}
              className="flex-1"
            >
              Approuver
            </Button>
            <Button
              variant="danger"
              iconName="X"
              iconPosition="left"
              onClick={() => onReject(request?.id)}
              className="flex-1"
            >
              Rejeter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveDetailsPanel;