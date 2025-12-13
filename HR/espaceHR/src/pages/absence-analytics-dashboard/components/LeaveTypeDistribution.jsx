import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const LeaveTypeDistribution = ({ data }) => {
  return (
    <div className="card-elevated p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Distribution par Type de Congé
        </h3>
        <p className="text-sm text-muted-foreground">
          Répartition des absences par catégorie
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-sm text-foreground">{item?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">
                {item?.value} jours
              </span>
              <span className="text-xs text-muted-foreground">
                ({item?.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold">💡 Insight:</span> Les congés annuels représentent 51% des absences, suivis des congés maladie (35%). Envisagez des politiques de congés flexibles pour mieux répartir les absences.
        </p>
      </div>
    </div>
  );
};

export default LeaveTypeDistribution;