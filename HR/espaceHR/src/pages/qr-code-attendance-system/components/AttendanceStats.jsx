import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStats = ({ stats }) => {
  const statCards = [
    {
      id: 'monthly-hours',
      label: 'Heures Mensuelles',
      value: stats?.monthlyHours,
      target: stats?.targetHours,
      unit: 'h',
      icon: 'Clock',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'overtime',
      label: 'Heures Supplémentaires',
      value: stats?.overtimeHours,
      unit: 'h',
      icon: 'TrendingUp',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'attendance-rate',
      label: 'Taux de Présence',
      value: stats?.attendanceRate,
      unit: '%',
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      id: 'late-arrivals',
      label: 'Retards',
      value: stats?.lateArrivals,
      unit: 'jours',
      icon: 'AlertCircle',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    }
  ];

  const calculateProgress = (value, target) => {
    if (!target) return 0;
    return Math.min((value / target) * 100, 100);
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Statistiques de Présence</h3>
        <div className="space-y-4">
          {statCards?.map((stat) => (
            <div key={stat?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                    <Icon name={stat?.icon} size={20} color={stat?.color} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{stat?.label}</p>
                    {stat?.target && (
                      <p className="text-xs text-muted-foreground">
                        Objectif: {stat?.target}{stat?.unit}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    {stat?.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {stat?.unit}
                    </span>
                  </p>
                </div>
              </div>
              {stat?.target && (
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${calculateProgress(stat?.value, stat?.target)}%`,
                      backgroundColor: stat?.color
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Conformité Horaire</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} color="var(--color-primary)" />
              <span className="text-sm text-foreground">Jours Travaillés</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {stats?.daysWorked} / {stats?.workingDays}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} color="var(--color-accent)" />
              <span className="text-sm text-foreground">Moyenne Quotidienne</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{stats?.avgDailyHours}h</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Target" size={16} color="var(--color-success)" />
              <span className="text-sm text-foreground">Objectif Atteint</span>
            </div>
            <span className="text-sm font-semibold text-success">
              {calculateProgress(stats?.monthlyHours, stats?.targetHours)?.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;