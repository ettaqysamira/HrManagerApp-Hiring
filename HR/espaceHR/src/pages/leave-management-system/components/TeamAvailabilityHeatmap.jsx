import React from 'react';
import Icon from '../../../components/AppIcon';

const TeamAvailabilityHeatmap = ({ availabilityData }) => {
  const getAvailabilityColor = (percentage) => {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const getAvailabilityLabel = (percentage) => {
    if (percentage >= 90) return 'Disponibilité élevée';
    if (percentage >= 70) return 'Disponibilité moyenne';
    return 'Disponibilité faible';
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Disponibilité de l'équipe
        </h3>
        <Icon name="Users" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-3">
        {availabilityData?.map((dept) => (
          <div key={dept?.department}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {dept?.department}
              </span>
              <span className="text-sm font-medium text-foreground">
                {dept?.available}/{dept?.total}
              </span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 ${getAvailabilityColor(
                  dept?.percentage
                )} transition-all duration-300`}
                style={{ width: `${dept?.percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {getAvailabilityLabel(dept?.percentage)} ({dept?.percentage}%)
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total disponible</span>
          <span className="font-semibold text-foreground">
            {availabilityData?.reduce((sum, dept) => sum + dept?.available, 0)}/
            {availabilityData?.reduce((sum, dept) => sum + dept?.total, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamAvailabilityHeatmap;