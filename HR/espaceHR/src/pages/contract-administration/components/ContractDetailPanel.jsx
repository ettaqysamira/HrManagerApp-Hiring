import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContractDetailPanel = ({ contract, onClose }) => {
  if (!contract) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileText" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-4">Sélectionnez un contrat pour voir les détails</p>
        </div>
      </div>
    );
  }

  const amendments = [
    {
      id: 1,
      date: "15/09/2025",
      type: "Augmentation salariale",
      description: "Augmentation de 7% suite à l'évaluation annuelle",
      author: "Samira Ettaqy"
    },
    {
      id: 2,
      date: "01/03/2025",
      type: "Changement de poste",
      description: "Promotion au poste de Développeur Senior",
      author: "Youssef Benali"
    },
    {
      id: 3,
      date: "10/01/2025",
      type: "Modification horaires",
      description: "Passage à temps partiel (80%)",
      author: "Fatima Zahra Idrissi"
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Détails du contrat</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-accent/10 transition-colors duration-150"
          aria-label="Fermer"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-border">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
            {contract?.employeeName?.split(' ')?.map(n => n?.[0])?.join('')}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-foreground mb-1">{contract?.employeeName}</h4>
            <p className="text-muted-foreground mb-2">{contract?.department}</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                {contract?.status === 'active' ? 'Actif' : contract?.status}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{contract?.contractType}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="font-semibold text-foreground">Informations contractuelles</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date de début</p>
              <p className="font-medium text-foreground">{contract?.startDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date de fin</p>
              <p className="font-medium text-foreground">{contract?.endDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Salaire annuel</p>
              <p className="font-medium text-foreground">{contract?.salary} MAD</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Jours restants</p>
              <p className="font-semibold text-warning">{contract?.daysUntilExpiration} jours</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="font-semibold text-foreground">Aperçu du document</h5>
          <div className="bg-muted rounded-lg p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="FileText" size={24} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Contrat_{contract?.employeeName?.replace(' ', '_')}.pdf</p>
                <p className="text-xs text-muted-foreground">Dernière modification: 15/11/2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" iconName="Eye">
                Prévisualiser
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Télécharger
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="font-semibold text-foreground">Historique des modifications</h5>
          <div className="space-y-3">
            {amendments?.map((amendment) => (
              <div key={amendment?.id} className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon name="FileEdit" size={16} color="var(--color-primary)" />
                    <span className="font-medium text-foreground text-sm">{amendment?.type}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{amendment?.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{amendment?.description}</p>
                <p className="text-xs text-muted-foreground">Par: {amendment?.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="font-semibold text-foreground">Informations de l'employé</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm text-foreground">{contract?.employeeName?.toLowerCase()?.replace(' ', '.')}@company.ma</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Téléphone</p>
              <p className="text-sm text-foreground">+212 6 12 34 56 78</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Numéro CNSS</p>
              <p className="text-sm text-foreground">12 345 678 901 234</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date d'embauche</p>
              <p className="text-sm text-foreground">{contract?.startDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-border flex gap-3">
        <Button variant="default" fullWidth iconName="RefreshCw">
          Renouveler le contrat
        </Button>
        <Button variant="outline" fullWidth iconName="Edit">
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default ContractDetailPanel;


