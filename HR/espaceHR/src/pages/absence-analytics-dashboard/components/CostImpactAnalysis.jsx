import React from 'react';
import { Euro, TrendingUp, AlertCircle } from 'lucide-react';

const CostImpactAnalysis = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const costItems = [
    { label: 'Coûts directs', value: data?.directCosts, color: 'var(--color-error)' },
    { label: 'Coûts indirects', value: data?.indirectCosts, color: 'var(--color-warning)' },
    { label: 'Perte de productivité', value: data?.productivityLoss, color: 'var(--color-accent)' },
    { label: 'Coûts de remplacement', value: data?.replacementCosts, color: 'var(--color-primary)' }
  ];

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-4">
        <Euro size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Analyse d'Impact des Coûts
        </h3>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Impact Total</p>
        <p className="text-3xl font-bold text-foreground">
          {formatCurrency(data?.totalImpact)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <TrendingUp size={16} className="text-error" />
          <span className="text-sm font-medium text-error">+8% ce trimestre</span>
        </div>
      </div>

      <div className="space-y-4">
        {costItems?.map((item, index) => {
          const percentage = (item?.value / data?.totalImpact) * 100;
          
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">{item?.label}</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(item?.value)}
                </span>
              </div>
              <div className="relative w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item?.color
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {percentage?.toFixed(1)}% du total
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="text-warning mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Budget à Risque
            </p>
            <p className="text-xs text-muted-foreground">
              L'augmentation des coûts d'absence dépasse le budget prévu de 12%. Des mesures d'optimisation sont recommandées.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Économies potentielles</p>
        <p className="text-xl font-bold text-success">
          {formatCurrency(89000)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Avec optimisation des politiques d'absence
        </p>
      </div>
    </div>
  );
};

export default CostImpactAnalysis;