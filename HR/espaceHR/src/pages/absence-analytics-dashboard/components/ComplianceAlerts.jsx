import React from 'react';
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';
import Button from '../../../components/ui/Button';

const ComplianceAlerts = ({ alerts, onAlertAction }) => {
  const getSeverityConfig = (severity) => {
    const configs = {
      high: {
        icon: AlertTriangle,
        color: 'var(--color-error)',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/30'
      },
      medium: {
        icon: AlertCircle,
        color: 'var(--color-warning)',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/30'
      },
      low: {
        icon: Info,
        color: 'var(--color-primary)',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/30'
      }
    };
    return configs?.[severity] || configs?.low;
  };

  return (
    <div className="card-elevated p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Alertes de Conformité
        </h3>
        <p className="text-sm text-muted-foreground">
          {alerts?.length} alerte{alerts?.length > 1 ? 's' : ''} nécessitant une attention
        </p>
      </div>

      <div className="space-y-3">
        {alerts?.map((alert, index) => {
          const config = getSeverityConfig(alert?.severity);
          const IconComponent = config?.icon;

          return (
            <div
              key={index}
              className={`p-4 border rounded-lg ${config?.bgColor} ${config?.borderColor} cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => onAlertAction(alert)}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${config?.color}20` }}
                >
                  <IconComponent size={20} style={{ color: config?.color }} />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {alert?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {alert?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-foreground">
                        {alert?.action}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Échéance: {new Date(alert?.dueDate)?.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <Button variant="outline" size="sm" className="w-full">
          Voir toutes les alertes
        </Button>
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold">💡 Astuce:</span> Configurez des alertes personnalisées pour rester informé des problèmes de conformité critiques.
        </p>
      </div>
    </div>
  );
};

export default ComplianceAlerts;