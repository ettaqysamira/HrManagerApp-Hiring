import React from 'react';
import * as Icons from 'lucide-react';

const AbsenceMetricCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon, 
  iconColor 
}) => {
  const IconComponent = Icons?.[icon];
  const TrendIcon = trend === 'up' ? Icons?.TrendingUp : Icons?.TrendingDown;
  
  return (
    <div className="card-elevated p-6">
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
          <TrendIcon 
            size={16} 
            className={trend === 'up' ? 'text-error' : 'text-success'} 
          />
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-error' : 'text-success'
          }`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default AbsenceMetricCard;