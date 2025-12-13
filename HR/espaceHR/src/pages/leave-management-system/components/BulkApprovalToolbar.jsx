import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkApprovalToolbar = ({
  selectedCount,
  onApproveAll,
  onRejectAll,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">
            {selectedCount} demande{selectedCount > 1 ? 's' : ''}{' '}
            sélectionnée{selectedCount > 1 ? 's' : ''}
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex gap-2">
          <Button
            variant="success"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={onApproveAll}
          >
            Approuver tout
          </Button>
          <Button
            variant="danger"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onRejectAll}
          >
            Rejeter tout
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="XCircle"
            onClick={onClearSelection}
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkApprovalToolbar;