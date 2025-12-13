import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, subtitle, icon, iconColor, trend, trendValue, trendDirection }) => {
  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-success';
    if (trendDirection === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trendDirection === 'up') return 'TrendingUp';
    if (trendDirection === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="card-content">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <Icon name={icon} size={24} color={iconColor} />
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              <Icon name={getTrendIcon()} size={16} />
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
            <span className="text-xs text-muted-foreground">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;