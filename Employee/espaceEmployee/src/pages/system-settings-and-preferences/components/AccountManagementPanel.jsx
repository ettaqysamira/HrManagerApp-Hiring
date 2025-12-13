import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountManagementPanel = ({ accountData, onExport, onDeactivate }) => {
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState('');

  const accountStats = [
    {
      label: "Compte créé le",
      value: accountData?.createdDate,
      icon: "Calendar"
    },
    {
      label: "Dernière connexion",
      value: accountData?.lastLogin,
      icon: "Clock"
    },
    {
      label: "Espace utilisé",
      value: accountData?.storageUsed,
      icon: "HardDrive"
    },
    {
      label: "Documents stockés",
      value: accountData?.documentCount,
      icon: "FileText"
    }
  ];

  const handleExportData = () => {
    onExport();
  };

  const handleDeactivateAccount = () => {
    if (deactivateReason?.trim()) {
      onDeactivate(deactivateReason);
      setShowDeactivateConfirm(false);
      setDeactivateReason('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Informations du compte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accountStats?.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={stat?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat?.label}</p>
                <p className="text-sm font-medium text-foreground mt-1">{stat?.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-base font-semibold text-foreground mb-2">Exporter mes données</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Téléchargez une copie complète de vos données personnelles et documents
        </p>
        <Button
          variant="outline"
          onClick={handleExportData}
          iconName="Download"
          iconPosition="left"
        >
          Exporter toutes les données
        </Button>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-base font-semibold text-foreground mb-2">Conformité RGPD</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Vos droits concernant vos données personnelles
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Icon name="Shield" size={18} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Droit d'accès</p>
              <p className="text-xs text-muted-foreground mt-1">
                Vous pouvez accéder à toutes vos données personnelles à tout moment
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Icon name="Edit" size={18} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Droit de rectification</p>
              <p className="text-xs text-muted-foreground mt-1">
                Vous pouvez modifier vos informations personnelles dans votre profil
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Icon name="Trash2" size={18} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Droit à l'effacement</p>
              <p className="text-xs text-muted-foreground mt-1">
                Vous pouvez demander la suppression de vos données personnelles
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card border border-error/20 rounded-lg p-6">
        <h3 className="text-base font-semibold text-error mb-2">Zone de danger</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Actions irréversibles concernant votre compte
        </p>

        {!showDeactivateConfirm ? (
          <Button
            variant="destructive"
            onClick={() => setShowDeactivateConfirm(true)}
            iconName="AlertTriangle"
            iconPosition="left"
          >
            Désactiver mon compte
          </Button>
        ) : (
          <div className="space-y-4 p-4 bg-error/5 rounded-lg border border-error/20">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Êtes-vous sûr de vouloir désactiver votre compte ?
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Cette action désactivera votre accès au portail. Vous pourrez réactiver votre compte en contactant les RH.
                </p>
              </div>
            </div>

            <Input
              type="text"
              label="Raison de la désactivation"
              placeholder="Veuillez indiquer la raison (optionnel)"
              value={deactivateReason}
              onChange={(e) => setDeactivateReason(e?.target?.value)}
            />

            <div className="flex items-center gap-3">
              <Button
                variant="destructive"
                onClick={handleDeactivateAccount}
              >
                Confirmer la désactivation
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeactivateConfirm(false);
                  setDeactivateReason('');
                }}
              >
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagementPanel;