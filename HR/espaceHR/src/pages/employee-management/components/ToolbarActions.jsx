import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ToolbarActions = ({ selectedCount, onBulkAction, onExport, onAddEmployee }) => {
  const [bulkAction, setBulkAction] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Actions en Masse', disabled: true },
    { value: 'updateStatus', label: 'Mettre à Jour le Statut' },
    { value: 'assignManager', label: 'Assigner un Manager' },
    { value: 'updateDepartment', label: 'Changer de Département' },
    { value: 'sendDocument', label: 'Envoyer un Document' },
    { value: 'export', label: 'Exporter la Sélection' }
  ];

  const exportFormats = [
    { format: 'xlsx', label: 'Excel (.xlsx)', icon: 'FileSpreadsheet' },
    { format: 'csv', label: 'CSV (.csv)', icon: 'FileText' },
    { format: 'pdf', label: 'PDF (.pdf)', icon: 'FileText' }
  ];

  const handleBulkActionChange = (value) => {
    setBulkAction(value);
    if (value) {
      onBulkAction(value);
      setBulkAction('');
    }
  };

  const handleExport = (format) => {
    onExport(format);
    setShowExportMenu(false);
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card border-b border-border">
      <div className="flex items-center gap-4">
        {selectedCount > 0 && (
          <>
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
              <Icon name="CheckSquare" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-primary">
                {selectedCount} sélectionné{selectedCount > 1 ? 's' : ''}
              </span>
            </div>
            <Select
              options={bulkActionOptions}
              value={bulkAction}
              onChange={handleBulkActionChange}
              placeholder="Actions en Masse"
              className="w-64"
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            Exporter
          </Button>
          {showExportMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elevation-2 z-10">
              {exportFormats?.map((format) => (
                <button
                  key={format?.format}
                  onClick={() => handleExport(format?.format)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <Icon name={format?.icon} size={18} color="var(--color-primary)" />
                  <span className="text-sm text-foreground">{format?.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          onClick={onAddEmployee}
        >
          Nouvel Employé
        </Button>
      </div>
    </div>
  );
};

export default ToolbarActions;