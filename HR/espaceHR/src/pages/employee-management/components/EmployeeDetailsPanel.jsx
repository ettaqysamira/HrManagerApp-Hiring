import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeDetailsPanel = ({ employee, onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);

  if (!employee) {
    return (
      <aside className="fixed top-16 right-0 w-96 h-[calc(100vh-4rem)] bg-card border-l border-border z-20 flex items-center justify-center">
        <div className="text-center p-8">
          <Icon name="UserCircle" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Sélectionnez un employé pour voir les détails</p>
        </div>
      </aside>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Informations', icon: 'User' },
    { id: 'access', label: 'Accès', icon: 'Key' },
    { id: 'contract', label: 'Contrat', icon: 'FileText' },
    { id: 'documents', label: 'Documents', icon: 'FolderOpen' },
    { id: 'audit', label: 'Historique', icon: 'Clock' }
  ];

  const personalInfo = [
    { label: 'Email', value: employee?.email, icon: 'Mail' },
    { label: 'Téléphone', value: employee?.phone, icon: 'Phone' },
    { label: 'Date de Naissance', value: employee?.birthDate, icon: 'Calendar' },
    { label: 'Adresse', value: employee?.address, icon: 'MapPin' },
    { label: 'Numéro de Sécurité Sociale', value: employee?.ssn, icon: 'Shield' }
  ];

  const contractInfo = [
    { label: 'Type de Contrat', value: employee?.contractStatus },
    { label: 'Date de Début', value: employee?.startDate },
    { label: 'Date de Fin', value: employee?.endDate || 'Indéterminée' },
    { label: 'Salaire Annuel', value: employee?.salary },
    { label: 'Manager Direct', value: employee?.manager }
  ];

  const documents = [
    { name: 'Contrat de Travail.pdf', date: '15/01/2023', size: '245 KB', icon: 'FileText' },
    { name: 'CV_Candidature.pdf', date: '10/01/2023', size: '189 KB', icon: 'FileText' },
    { name: 'Diplômes.pdf', date: '10/01/2023', size: '512 KB', icon: 'Award' },
    { name: 'Pièce d\'Identité.pdf', date: '10/01/2023', size: '156 KB', icon: 'CreditCard' }
  ];

  const auditTrail = [
    { action: 'Modification du statut', user: 'Marie Rousseau', date: '28/11/2025 14:30', details: 'Statut changé de "Période d\'Essai" à "Actif"' },
    { action: 'Mise à jour du contrat', user: 'Jean Dupont', date: '15/11/2025 09:15', details: 'Prolongation du contrat CDD' },
    { action: 'Ajout de document', user: 'Marie Rousseau', date: '10/11/2025 16:45', details: 'Contrat de travail signé ajouté' },
    { action: 'Création du profil', user: 'Système', date: '10/01/2023 10:00', details: 'Profil employé créé' }
  ];

  return (
    <aside className="fixed top-16 right-0 w-96 h-[calc(100vh-4rem)] bg-card border-l border-border z-20 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Détails de l'Employé</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-accent/10 transition-colors"
          aria-label="Fermer le panneau"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={employee?.avatar}
            alt={employee?.avatarAlt}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{employee?.name}</h3>
            <p className="text-sm text-muted-foreground">{employee?.position}</p>
            <p className="text-xs text-muted-foreground mt-1">ID: {employee?.employeeId}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" iconName="Mail" fullWidth>
            Email
          </Button>
          <Button variant="outline" size="sm" iconName="Phone" fullWidth>
            Appeler
          </Button>
        </div>
      </div>
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden xl:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'personal' && (
          <div className="space-y-4">
            {personalInfo?.map((info, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name={info?.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{info?.label}</p>
                  <p className="text-sm text-foreground font-medium">{info?.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'access' && (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Key" size={20} color="var(--color-primary)" />
                <h3 className="text-sm font-semibold text-foreground">Identifiants de Connexion</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Ces identifiants permettent à l'employé d'accéder au système
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Nom d'utilisateur</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-foreground font-medium">{employee?.username}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(employee?.username);
                      }}
                      className="p-1.5 rounded hover:bg-accent/10 transition-colors"
                      aria-label="Copier le nom d'utilisateur"
                    >
                      <Icon name="Copy" size={14} color="var(--color-muted-foreground)" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="Lock" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Mot de passe</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-foreground font-medium font-mono">
                      {showPassword ? employee?.password : '••••••••••'}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1.5 rounded hover:bg-accent/10 transition-colors"
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      >
                        <Icon
                          name={showPassword ? 'EyeOff' : 'Eye'}
                          size={14}
                          color="var(--color-muted-foreground)"
                        />
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(employee?.password);
                        }}
                        className="p-1.5 rounded hover:bg-accent/10 transition-colors"
                        aria-label="Copier le mot de passe"
                      >
                        <Icon name="Copy" size={14} color="var(--color-muted-foreground)" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button variant="outline" fullWidth iconName="RefreshCw" iconPosition="left">
                Réinitialiser le Mot de Passe
              </Button>
            </div>

            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex gap-2">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-warning mb-1">Sécurité</p>
                  <p className="text-xs text-muted-foreground">
                    Ne partagez jamais ces identifiants par email ou messagerie non sécurisée
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contract' && (
          <div className="space-y-4">
            {contractInfo?.map((info, index) => (
              <div key={index} className="pb-3 border-b border-border last:border-0">
                <p className="text-xs text-muted-foreground mb-1">{info?.label}</p>
                <p className="text-sm text-foreground font-medium">{info?.value}</p>
              </div>
            ))}
            <div className="mt-6">
              <Button variant="outline" fullWidth iconName="Download" iconPosition="left">
                Télécharger le Contrat
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-3">
            {documents?.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name={doc?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc?.name}</p>
                  <p className="text-xs text-muted-foreground">{doc?.date} • {doc?.size}</p>
                </div>
                <button className="p-1 rounded hover:bg-accent/10 transition-colors">
                  <Icon name="Download" size={16} color="var(--color-muted-foreground)" />
                </button>
              </div>
            ))}
            <div className="mt-6">
              <Button variant="outline" fullWidth iconName="Upload" iconPosition="left">
                Ajouter un Document
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4">
            {auditTrail?.map((entry, index) => (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-border last:border-0">
                <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                <div className="mb-1">
                  <p className="text-sm font-medium text-foreground">{entry?.action}</p>
                  <p className="text-xs text-muted-foreground">{entry?.user} • {entry?.date}</p>
                </div>
                <p className="text-xs text-muted-foreground">{entry?.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default EmployeeDetailsPanel;