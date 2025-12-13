import React from 'react';
import { Users } from 'lucide-react';

const PipelineVisualization = ({ stages }) => {
  const totalCandidates = stages?.reduce((sum, stage) => sum + stage?.count, 0);

  return (
    <div className="card-elevated p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Pipeline de Recrutement
        </h3>
        <p className="text-sm text-muted-foreground">
          {totalCandidates} candidats au total
        </p>
      </div>

      <div className="space-y-4">
        {stages?.map((stage, index) => {
          const percentage = totalCandidates > 0 ? (stage?.count / totalCandidates) * 100 : 0;
          
          return (
            <div key={index} className="group cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stage?.color }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {stage?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {stage?.count}
                  </span>
                  <Users size={14} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: stage?.color
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {percentage?.toFixed(1)}% du total
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          Taux de Conversion
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Nouveau → Entretien</span>
            <span className="font-medium text-foreground">65%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Entretien → Offre</span>
            <span className="font-medium text-foreground">38%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Offre → Accepté</span>
            <span className="font-medium text-foreground">67%</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 <span className="font-medium">Astuce:</span> Glissez-déposez les candidats entre les étapes pour mettre à jour leur statut
        </p>
      </div>
    </div>
  );
};

export default PipelineVisualization;