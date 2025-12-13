import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeaveRequestCard = ({ request, onApprove, onReject, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      approved: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-error/10 text-error border-error/20',
    };
    return colors?.[status] || colors?.pending;
  };

  const getLeaveTypeIcon = (type) => {
    const icons = {
      vacation: 'Palmtree',
      sick: 'Stethoscope',
      personal: 'User',
      parental: 'Baby',
    };
    return icons?.[type] || 'Calendar';
  };

  return (
    <div className="card-elevated p-4 hover:shadow-lg transition-shadow duration-150">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon
              name={getLeaveTypeIcon(request?.type)}
              size={20}
              color="var(--color-primary)"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">
              {request?.employeeName}
            </h4>
            <p className="text-xs text-muted-foreground">
              {request?.department}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded border ${getStatusColor(
            request?.status
          )}`}
        >
          {request?.status === 'pending' && 'En attente'}
          {request?.status === 'approved' && 'Approuvé'}
          {request?.status === 'rejected' && 'Rejeté'}
        </span>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>
            {request?.startDate} - {request?.endDate}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>{request?.duration} jours</span>
        </div>
        {request?.reason && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {request?.reason}
          </p>
        )}
      </div>
      {request?.status === 'pending' && (
        <div className="flex gap-2">
          <Button
            variant="success"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={() => onApprove(request?.id)}
            className="flex-1"
          >
            Approuver
          </Button>
          <Button
            variant="danger"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={() => onReject(request?.id)}
            className="flex-1"
          >
            Rejeter
          </Button>
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        iconName="Eye"
        iconPosition="left"
        onClick={() => onViewDetails(request)}
        className="w-full mt-2"
      >
        Voir détails
      </Button>
    </div>
  );
};

export default LeaveRequestCard;