import React from 'react';

const AbsenceHeatmap = ({ data }) => {
  const getHeatmapColor = (value) => {
    if (value < 12) return '#10b981';
    if (value < 16) return '#f59e0b';
    return '#ef4444';
  };

  const getColorIntensity = (value) => {
    const minValue = 10;
    const maxValue = 22;
    const intensity = ((value - minValue) / (maxValue - minValue)) * 100;
    return Math.min(100, Math.max(20, intensity));
  };

  return (
    <div className="card-elevated p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Carte de Chaleur des Absences
        </h3>
        <p className="text-sm text-muted-foreground">
          Fréquence des absences par jour de la semaine
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 text-sm font-semibold text-foreground">Jour</th>
              <th className="text-center p-2 text-sm font-semibold text-foreground">S1</th>
              <th className="text-center p-2 text-sm font-semibold text-foreground">S2</th>
              <th className="text-center p-2 text-sm font-semibold text-foreground">S3</th>
              <th className="text-center p-2 text-sm font-semibold text-foreground">S4</th>
              <th className="text-center p-2 text-sm font-semibold text-foreground">S5</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 text-sm font-medium text-foreground">{row?.day}</td>
                {['week1', 'week2', 'week3', 'week4', 'week5']?.map((week) => {
                  const value = row?.[week];
                  const color = getHeatmapColor(value);
                  const opacity = getColorIntensity(value) / 100;
                  
                  return (
                    <td key={week} className="p-2">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-lg font-semibold text-white cursor-pointer hover:scale-110 transition-transform"
                        style={{ 
                          backgroundColor: color,
                          opacity: opacity
                        }}
                        title={`${row?.day} - ${week}: ${value} absences`}
                      >
                        {value}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Faible</span>
          <div className="flex gap-1">
            {[20, 40, 60, 80, 100]?.map((opacity) => (
              <div
                key={opacity}
                className="w-6 h-6 rounded"
                style={{ 
                  backgroundColor: '#ef4444',
                  opacity: opacity / 100
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Élevé</span>
        </div>
      </div>
    </div>
  );
};

export default AbsenceHeatmap;