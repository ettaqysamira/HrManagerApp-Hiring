import React from 'react';
import Icon from '../../../components/AppIcon';

const ChangeHistoryTimeline = ({ changes }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'rejected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return 'CheckCircle2';
      case 'pending':
        return 'Clock';
      case 'rejected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'pending':
        return 'En Attente';
      case 'rejected':
        return 'Rejeté';
      default:
        return 'Inconnu';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  const defaultChanges = [
    {
      id: 1,
      field: 'Salaire',
      oldValue: '5000 MAD',
      newValue: '5500 MAD',
      status: 'approved',
      timestamp: '2025-11-15T10:30:00',
      approvedBy: 'Amine Bensaid',
      reason: 'Réévaluation annuelle'
    },
    {
      id: 2,
      field: 'Titre du Poste',
      oldValue: 'Développeur Junior',
      newValue: 'Développeur Senior',
      status: 'approved',
      timestamp: '2025-11-20T14:45:00',
      approvedBy: 'Salma El Idrissi',
      reason: 'Promotion suite à évaluation positive'
    },
    {
      id: 3,
      field: 'Congés Payés',
      oldValue: '15 jours',
      newValue: '20 jours',
      status: 'pending',
      timestamp: '2025-11-25T09:15:00',
      approvedBy: 'Rachid El Amrani',
      reason: 'Mise à jour annuelle des soldes'
    },
    {
      id: 4,
      field: 'Département',
      oldValue: 'Marketing',
      newValue: 'Ventes',
      status: 'rejected',
      timestamp: '2025-11-28T16:20:00',
      approvedBy: 'Fatima Zahra Idrissi',
      reason: 'Changement non validé par la direction'
    },
    {
      id: 5,
      field: 'Téléphone',
      oldValue: '+212 600 123 456',
      newValue: '+212 660 987 654',
      status: 'approved',
      timestamp: '2025-12-01T08:00:00',
      approvedBy: 'Mohamed Tazi',
      reason: 'Mise à jour des coordonnées personnelles'
    }
  ];

  const timelineChanges = changes && changes.length > 0 ? changes : defaultChanges;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-sm font-semibold text-foreground mb-6">Historique des Modifications</h3>
      <div className="space-y-6">
        {timelineChanges?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="History" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Aucune modification récente</p>
          </div>
        ) : (
          timelineChanges?.map((change, index) => (
            <div key={change?.id} className="relative">
              {index !== timelineChanges?.length - 1 && (
                <div className="absolute left-4 top-10 bottom-0 w-px bg-border" />
              )}
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  change?.status === 'approved' ? 'bg-success/10' :
                  change?.status === 'pending' ? 'bg-warning/10' :
                  change?.status === 'rejected'? 'bg-error/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getStatusIcon(change?.status)} 
                    size={16} 
                    color={
                      change?.status === 'approved' ? 'var(--color-success)' :
                      change?.status === 'pending' ? 'var(--color-warning)' :
                      change?.status === 'rejected' ? 'var(--color-error)' :
                      'var(--color-muted-foreground)'
                    }
                  />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{change?.field}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(change?.timestamp)}</p>
                    </div>
                    <span className={`text-xs font-medium ${getStatusColor(change?.status)}`}>
                      {getStatusLabel(change?.status)}
                    </span>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                    {change?.oldValue && (
                      <div className="flex items-start gap-2">
                        <Icon name="Minus" size={14} color="var(--color-error)" className="mt-0.5" />
                        <p className="text-xs text-muted-foreground line-through">{change?.oldValue}</p>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <Icon name="Plus" size={14} color="var(--color-success)" className="mt-0.5" />
                      <p className="text-xs text-foreground font-medium">{change?.newValue}</p>
                    </div>
                  </div>
                  {change?.approvedBy && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Par {change?.approvedBy}
                    </p>
                  )}
                  {change?.reason && (
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Raison: {change?.reason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChangeHistoryTimeline;
