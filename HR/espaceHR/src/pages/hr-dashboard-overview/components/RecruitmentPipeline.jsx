import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RecruitmentPipeline = ({ data }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-error)'
  ];

  const hasData = data?.some(item => item.value > 0);

  return (
    <div className="card-elevated p-6 min-h-[420px]">
      <h3 className="text-lg font-semibold text-foreground mb-4">Pipeline de Recrutement</h3>
      <div className="w-full h-[350px] flex items-center justify-center">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: '12px',
                  color: 'var(--color-foreground)',
                  marginTop: '15px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-muted-foreground p-10 bg-muted/20 rounded-xl border border-dashed border-border w-full">
            <p className="font-medium text-foreground">Aucun candidat dans le pipeline</p>
            <p className="text-xs mt-1">Les statistiques s'afficheront ici après avoir reçu des candidatures</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentPipeline;