import React from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActionsBar = ({ 
  selectedCount, 
  totalCount,
  allSelected,
  onSelectAll,
  onMarkAllRead,
  onArchiveSelected,
  onDeleteSelected,
  onClearSelection 
}) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-accent/10 border-b border-accent/20 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={allSelected}
            onChange={onSelectAll}
            label={`${selectedCount} / ${totalCount} sélectionné${selectedCount > 1 ? 's' : ''}`}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
          >
            Annuler
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MailOpen"
            onClick={onMarkAllRead}
          >
            Marquer comme lu
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Archive"
            onClick={onArchiveSelected}
          >
            Archiver
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={onDeleteSelected}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;