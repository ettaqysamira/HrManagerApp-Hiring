import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ title, description, icon, iconColor, onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-lg border border-border bg-card hover:bg-muted hover:shadow-md transition-all duration-200 text-left group"
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </div>
        
        <Icon 
          name="ChevronRight" 
          size={20} 
          className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" 
        />
      </div>
    </button>
  );
};

export default QuickActionCard;