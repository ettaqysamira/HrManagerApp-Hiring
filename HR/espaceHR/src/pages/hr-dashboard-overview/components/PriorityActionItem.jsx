import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityActionItem = ({ title, description, priority, dueDate, category, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBg = () => {
    switch (priority) {
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      case 'low':
        return 'bg-success/10';
      default:
        return 'bg-muted';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'contract':
        return 'FileText';
      case 'leave':
        return 'Calendar';
      case 'recruitment':
        return 'Users';
      case 'training':
        return 'GraduationCap';
      default:
        return 'AlertCircle';
    }
  };

  return (
    <div className="card-elevated p-4 mb-3">
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-10 h-10 rounded-lg ${getPriorityBg()} flex items-center justify-center flex-shrink-0`}>
            <Icon name={getCategoryIcon()} size={20} color={`var(--color-${priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'success'})`} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className={`text-xs font-medium ${getPriorityColor()}`}>
                {priority === 'high' ? 'Haute priorité' : priority === 'medium' ? 'Priorité moyenne' : 'Basse priorité'}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="Clock" size={12} />
                {dueDate}
              </span>
            </div>
          </div>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
          color="var(--color-muted-foreground)"
        />
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm"
              iconName="Check"
              iconPosition="left"
              onClick={() => onAction('approve')}
            >
              Approuver
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onAction('view')}
            >
              Voir Détails
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityActionItem;