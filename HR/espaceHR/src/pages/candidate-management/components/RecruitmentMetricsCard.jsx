import React from 'react';
import * as Icons from 'lucide-react';

const RecruitmentMetricsCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon, 
  iconColor,
  onClick 
}) => {
  const IconComponent = Icons?.[icon];
  const trendIcon = trend === 'up' ? Icons?.TrendingUp : trend === 'down' ? Icons?.TrendingDown : null;
  
  return (
    <div 
      className={`card-elevated p-6 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        {IconComponent && (
          <div 
            className="p-3 rounded-lg" 
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <IconComponent size={24} style={{ color: iconColor }} />
          </div>
        )}
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center gap-2">
          {trendIcon && (
            <trendIcon 
              size={16} 
              className={trend === 'up' ? 'text-success' : 'text-error'} 
            />
          )}
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-success' : 'text-error'
          }`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default RecruitmentMetricsCard;