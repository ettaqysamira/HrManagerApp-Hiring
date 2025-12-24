import React, { useState, useEffect } from 'react';
import { SidebarProvider, useSidebar } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import Icon from '../../components/AppIcon';
import SettingsTab from './components/SettingsTab';
import PersonalPreferencesPanel from './components/PersonalPreferencesPanel';
import NotificationSettingsPanel from './components/NotificationSettingsPanel';
import SecurityPanel from './components/SecurityPanel';
import AccountManagementPanel from './components/AccountManagementPanel';

const SystemSettingsContent = () => {
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('preferences');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
  }, []);

  const [preferences, setPreferences] = useState({
    language: 'fr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    theme: 'light',
    dashboardLayout: 'comfortable'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    frequency: 'instant',
    priority: 'all',
    leave: { email: true, sms: false, inApp: true },
    documents: { email: true, sms: false, inApp: true },
    training: { email: false, sms: false, inApp: true },
    attendance: { email: false, sms: true, inApp: true },
    system: { email: true, sms: false, inApp: true }
  });

  const [securityData, setSecurityData] = useState({
    lastPasswordChange: '15/10/2025',
    twoFactorEnabled: false
  });

  const accountData = {
    createdDate: '01/01/2023',
    lastLogin: '29/11/2025 12:35',
    storageUsed: '2.4 GB / 5 GB',
    documentCount: '127 documents'
  };

  const tabs = [
    {
      id: 'preferences',
      label: 'Préférences personnelles',
      icon: 'Settings'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell'
    },
    {
      id: 'security',
      label: 'Sécurité',
      icon: 'Shield'
    },
    {
      id: 'account',
      label: 'Gestion du compte',
      icon: 'User'
    }
  ];

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    setSuccessMessage('Préférences enregistrées avec succès');
    setShowSuccessMessage(true);
  };

  const handleSaveNotifications = (newSettings) => {
    setNotificationSettings(newSettings);
    setSuccessMessage('Paramètres de notification enregistrés');
    setShowSuccessMessage(true);
  };

  const handlePasswordChange = (passwordData) => {
    setSecurityData({
      ...securityData,
      lastPasswordChange: new Date()?.toLocaleDateString('fr-FR')
    });
    setSuccessMessage('Mot de passe modifié avec succès');
    setShowSuccessMessage(true);
  };

  const handleTwoFactorToggle = (enabled) => {
    setSecurityData({
      ...securityData,
      twoFactorEnabled: enabled
    });
    setSuccessMessage(
      enabled
        ? 'Authentification à deux facteurs activée'
        : 'Authentification à deux facteurs désactivée'
    );
    setShowSuccessMessage(true);
  };

  const handleExportData = () => {
    setSuccessMessage('Export des données en cours... Vous recevrez un email avec le lien de téléchargement');
    setShowSuccessMessage(true);
  };

  const handleDeactivateAccount = (reason) => {
    console.log('Deactivating account with reason:', reason);
    setSuccessMessage('Demande de désactivation envoyée aux RH');
    setShowSuccessMessage(true);
  };

  return (
    <>
      <SidebarNavigation notificationCount={5} />
      <MobileNavigationMenu notificationCount={5} />
      <TopBar currentUser={currentUser} notificationCount={5} />

      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Paramètres et Préférences</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Personnalisez votre expérience et gérez votre compte
                  </p>
                </div>
              </div>
            </div>

            {showSuccessMessage && (
              <div className="mb-6 animate-fade-in">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{successMessage}</p>
                    </div>
                    <button
                      onClick={() => setShowSuccessMessage(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <SettingsTab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="p-6">
                {activeTab === 'preferences' && (
                  <PersonalPreferencesPanel
                    preferences={preferences}
                    onSave={handleSavePreferences}
                  />
                )}

                {activeTab === 'notifications' && (
                  <NotificationSettingsPanel
                    settings={notificationSettings}
                    onSave={handleSaveNotifications}
                  />
                )}

                {activeTab === 'security' && (
                  <SecurityPanel
                    securityData={securityData}
                    onPasswordChange={handlePasswordChange}
                    onTwoFactorToggle={handleTwoFactorToggle}
                  />
                )}

                {activeTab === 'account' && (
                  <AccountManagementPanel
                    accountData={accountData}
                    onExport={handleExportData}
                    onDeactivate={handleDeactivateAccount}
                  />
                )}
              </div>
            </div>


          </div>
        </div>
      </main>
    </>
  );
};

const SystemSettingsAndPreferences = () => {
  return (
    <SidebarProvider>
      <SystemSettingsContent />
    </SidebarProvider>
  );
};

export default SystemSettingsAndPreferences;