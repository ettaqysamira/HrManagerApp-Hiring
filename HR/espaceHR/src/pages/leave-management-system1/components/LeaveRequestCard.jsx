import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeaveRequestCard = ({ request, onViewDetails, onApprove, onReject }) => {
  const statusConfig = {
    'Approuvé': {
      color: 'bg-success/10 text-success border-success/20',
      icon: 'CheckCircle'
    },
    'En attente': {
      color: 'bg-warning/10 text-warning border-warning/20',
      icon: 'Clock'
    },
    'Rejeté': {
      color: 'bg-error/10 text-error border-error/20',
      icon: 'XCircle'
    }
  };
  
  const config = statusConfig?.[request?.status] || statusConfig?.['En attente'];
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Image
            src={request?.employeeAvatar}
            alt={request?.employeeAvatarAlt}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground">{request?.employeeName}</h4>
            <p className="text-xs text-muted-foreground">{request?.department}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
          <Icon name={config?.icon} size={14} />
          {request?.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-foreground font-medium">{request?.leaveType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>{formatDate(request?.startDate)} - {formatDate(request?.endDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Timer" size={16} />
          <span>{request?.duration} jour{request?.duration > 1 ? 's' : ''}</span>
        </div>
      </div>
      {request?.reason && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Motif:</p>
          <p className="text-sm text-foreground">{request?.reason}</p>
        </div>
      )}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Chaîne d'approbation</span>
          <span className="text-xs font-medium text-foreground">{request?.approvalProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${request?.approvalProgress}%` }}
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          {request?.approvers?.map((approver, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                ${approver?.approved ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}`}>
                {approver?.approved ? <Icon name="Check" size={12} /> : approver?.initials}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetails(request)}
          className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-foreground bg-muted hover:bg-muted/80 transition-colors duration-200"
        >
          Détails
        </button>
        {request?.status === 'En attente' && (
          <>
            <button
              onClick={() => onApprove(request)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-success hover:bg-success/90 transition-colors duration-200"
              aria-label="Approuver"
            >
              <Icon name="Check" size={16} />
            </button>
            <button
              onClick={() => onReject(request)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-error hover:bg-error/90 transition-colors duration-200"
              aria-label="Rejeter"
            >
              <Icon name="X" size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestCard;