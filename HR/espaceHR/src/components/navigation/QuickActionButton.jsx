import React, { useState } from 'react';
import Icon from '../AppIcon';

const QuickActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { label: 'Nouvel Employé', icon: 'UserPlus', action: 'add-employee' },
    { label: 'Nouveau Contrat', icon: 'FilePlus', action: 'add-contract' },
    { label: 'Approuver Congé', icon: 'CheckCircle', action: 'approve-leave' },
    { label: 'Rapport Urgent', icon: 'AlertCircle', action: 'urgent-report' },
  ];

  const handleAction = (action) => {
    console.log('Quick action:', action);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card border border-border rounded-lg shadow-elevation-2 p-2 min-w-[200px]">
          {quickActions?.map((action) => (
            <button
              key={action?.action}
              onClick={() => handleAction(action?.action)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent/10 transition-colors duration-150 text-left"
            >
              <Icon name={action?.icon} size={20} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">
                {action?.label}
              </span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevation-2 flex items-center justify-center hover:bg-primary/90 transition-all duration-150 active:scale-95"
        aria-label="Quick actions"
      >
        <Icon name={isOpen ? 'X' : 'Plus'} size={24} />
      </button>
    </div>
  );
};

export default QuickActionButton;