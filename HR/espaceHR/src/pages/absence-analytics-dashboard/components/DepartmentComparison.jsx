import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DepartmentComparison = ({ data }) => {
  return (
    <div className="card-elevated p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Comparaison par Département
        </h3>
        <p className="text-sm text-muted-foreground">
          Taux d'absence et durée moyenne par département
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="department" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="absenceRate" 
              fill="var(--color-primary)" 
              name="Taux d'absence (%)"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="avgDuration" 
              fill="var(--color-accent)" 
              name="Durée moyenne (jours)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Département le plus touché</p>
          <p className="text-lg font-semibold text-foreground">Ventes (4.1%)</p>
        </div>
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Durée moyenne la plus longue</p>
          <p className="text-lg font-semibold text-foreground">Ventes (5.3j)</p>
        </div>
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Coût total le plus élevé</p>
          <p className="text-lg font-semibold text-foreground">Ventes (78K)</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComparison;