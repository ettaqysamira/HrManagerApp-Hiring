import React from 'react';
import Icon from '../../../components/AppIcon';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const NotificationCategoryItem = ({ 
  category, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon name={category?.icon} size={18} />
        <span className="text-sm font-medium">{category?.label}</span>
      </div>
      {category?.unreadCount > 0 && (
        <NotificationBadge count={category?.unreadCount} />
      )}
    </button>
  );
};

export default NotificationCategoryItem;