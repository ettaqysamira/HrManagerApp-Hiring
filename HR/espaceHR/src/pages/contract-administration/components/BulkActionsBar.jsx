import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onRenewAll, onExport, onArchive, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-in slide-in-from-bottom-2 duration-200">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">{selectedCount}</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {selectedCount} contrat{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRenewAll} iconName="RefreshCw">
            Renouveler
          </Button>
          <Button variant="outline" size="sm" onClick={onExport} iconName="Download">
            Exporter
          </Button>
          <Button variant="outline" size="sm" onClick={onArchive} iconName="Archive">
            Archiver
          </Button>
          <button
            onClick={onClearSelection}
            className="p-2 rounded-md hover:bg-accent/10 transition-colors duration-150"
            aria-label="Effacer la sélection"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;