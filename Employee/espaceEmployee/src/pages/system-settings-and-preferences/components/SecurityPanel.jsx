import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecurityPanel = ({ securityData, onPasswordChange, onTwoFactorToggle }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const activeSessions = [
    {
      id: 1,
      device: "PC Windows - Chrome",
      location: "Casablanca, Maroc",
      ipAddress: "192.168.1.101",
      lastActive: "Il y a 1 minute",
      isCurrent: true
    },
    {
      id: 2,
      device: "iPhone 14 - Safari",
      location: "Rabat, Maroc",
      ipAddress: "192.168.1.102",
      lastActive: "Il y a 3 heures",
      isCurrent: false
    },
    {
      id: 3,
      device: "Laptop - Firefox",
      location: "Marrakech, Maroc",
      ipAddress: "192.168.1.103",
      lastActive: "Hier à 18:30",
      isCurrent: false
    }
  ];

  const loginHistory = [
    { id: 1, timestamp: "12/12/2025 10:20", device: "PC Windows - Chrome", location: "Casablanca, Maroc", status: "success" },
    { id: 2, timestamp: "12/12/2025 08:15", device: "iPhone 14 - Safari", location: "Rabat, Maroc", status: "success" },
    { id: 3, timestamp: "11/12/2025 18:45", device: "Laptop - Firefox", location: "Marrakech, Maroc", status: "failed" },
    { id: 4, timestamp: "10/12/2025 09:30", device: "PC Windows - Edge", location: "Fès, Maroc", status: "success" }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
    setPasswordErrors({ ...passwordErrors, [field]: '' });
  };

  const validatePassword = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Le mot de passe actuel est requis";
    }
    if (!passwordData.newPassword) {
      errors.newPassword = "Le nouveau mot de passe est requis";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    return errors;
  };

  const handleSubmitPassword = () => {
    const errors = validatePassword();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    onPasswordChange(passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Mot de passe</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Dernière modification : {securityData?.lastPasswordChange || "01/12/2025"}
            </p>
          </div>
          {!showPasswordForm && (
            <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(true)} iconName="Key" iconPosition="left">
              Modifier
            </Button>
          )}
        </div>

        {showPasswordForm && (
          <div className="space-y-4 mt-4 pt-4 border-t border-border">
            <Input
              type="password"
              label="Mot de passe actuel"
              placeholder="Entrez votre mot de passe actuel"
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              error={passwordErrors.currentPassword}
              required
            />
            <Input
              type="password"
              label="Nouveau mot de passe"
              placeholder="Entrez un nouveau mot de passe"
              description="Minimum 8 caractères avec lettres et chiffres"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              error={passwordErrors.newPassword}
              required
            />
            <Input
              type="password"
              label="Confirmer le mot de passe"
              placeholder="Confirmez votre nouveau mot de passe"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              error={passwordErrors.confirmPassword}
              required
            />
            <div className="flex items-center gap-3 pt-2">
              <Button variant="default" onClick={handleSubmitPassword}>
                Enregistrer le mot de passe
              </Button>
              <Button variant="outline" onClick={() => { setShowPasswordForm(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); setPasswordErrors({}); }}>
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Authentification à deux facteurs</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ajoutez une couche de sécurité supplémentaire à votre compte
            </p>
          </div>
          <Checkbox checked={securityData?.twoFactorEnabled} onChange={(e) => onTwoFactorToggle(e.target.checked)} />
        </div>

        {securityData?.twoFactorEnabled && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Icon name="ShieldCheck" size={20} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">2FA activé</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Votre compte est protégé par l'authentification à deux facteurs
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Sessions actives</h3>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-start justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Monitor" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{session.device}</p>
                    {session.isCurrent && <span className="badge badge-success text-xs">Actuelle</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{session.location} • {session.ipAddress}</p>
                  <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                </div>
              </div>
              {!session.isCurrent && (
                <Button variant="ghost" size="sm" onClick={() => handleTerminateSession(session.id)} iconName="X">
                  Terminer
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Historique de connexion</h3>
        <div className="space-y-2">
          {loginHistory.map((login) => (
            <div key={login.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors duration-200">
              <div className="flex items-center gap-3">
                <Icon
                  name={login.status === 'success' ? 'CheckCircle' : 'XCircle'}
                  size={16}
                  className={login.status === 'success' ? 'text-success' : 'text-error'}
                />
                <div>
                  <p className="text-sm text-foreground">{login.device}</p>
                  <p className="text-xs text-muted-foreground">{login.location}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{login.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;
