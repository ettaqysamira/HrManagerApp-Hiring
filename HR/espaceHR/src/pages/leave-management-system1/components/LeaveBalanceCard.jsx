import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveBalanceCard = ({ type, balance, total, accrualRate, color, icon }) => {
  const percentage = (balance / total) * 100;
  
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon name={icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{type}</h3>
            <p className="text-2xl font-bold text-foreground mt-1">
              {balance} <span className="text-sm font-normal text-muted-foreground">/ {total} jours</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Accumulation: <span className="font-medium text-foreground">{accrualRate}</span>
        </p>
      </div>
    </div>
  );
};

export default LeaveBalanceCard;