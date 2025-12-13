import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

const AbsenceForecasting = ({ data }) => {
  return (
    <div className="card-elevated p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Prévisions d'Absence
        </h3>
        <p className="text-sm text-muted-foreground">
          Tendances historiques et prévisions basées sur l'IA
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Jours d\'absence', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              name="Réel"
              dot={{ fill: 'var(--color-primary)', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Prévision"
              dot={{ fill: 'var(--color-accent)', r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Tendance</p>
          <p className="text-lg font-semibold text-foreground">+12% ↑</p>
          <p className="text-xs text-muted-foreground mt-1">Augmentation prévue</p>
        </div>
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Pic attendu</p>
          <p className="text-lg font-semibold text-foreground">Août 2026</p>
          <p className="text-xs text-muted-foreground mt-1">410 jours prévus</p>
        </div>
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Précision</p>
          <p className="text-lg font-semibold text-foreground">91%</p>
          <p className="text-xs text-muted-foreground mt-1">Confiance moyenne</p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold">⚠️ Alerte:</span> Les prévisions indiquent une augmentation significative des absences pour le T3. Planifiez des ressources supplémentaires ou des mesures préventives.
        </p>
      </div>
    </div>
  );
};

export default AbsenceForecasting;