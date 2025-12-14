import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = ({ stats }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 mt-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Statistiques Rapides</h3>
      <div className="space-y-4">
        {stats?.map((stat) => (
          <div key={stat?.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} color={stat?.iconColor} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat?.label}</p>
                <p className="text-sm font-semibold text-foreground">{stat?.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsCard;