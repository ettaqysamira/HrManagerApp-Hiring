import React from 'react';
import Icon from '../../../components/AppIcon';

const ContractStatusCard = ({ title, count, icon, iconColor, trend, trendValue, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 border border-border transition-all duration-150 hover:shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${iconColor} bg-opacity-10 flex items-center justify-center`}>
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-foreground">{count}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default ContractStatusCard;