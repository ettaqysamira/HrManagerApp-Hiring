import React, { useState } from 'react';
import { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import Icon from '../../components/AppIcon';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import QuickStatsCard from './components/QuickStatsCard';
import ProfileSectionNav from './components/ProfileSectionNav';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import ContactInformationForm from './components/ContactInformationForm';
import EmergencyContactsForm from './components/EmergencyContactsForm';
import BankingDetailsForm from './components/BankingDetailsForm';
import ChangeHistoryTimeline from './components/ChangeHistoryTimeline';
import SyncStatusCard from './components/SyncStatusCard';

const EmployeeProfileManagement = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const currentUser = {
    name: "Samira ETTAQY",
    role: "Développeuse Senior",
    email: "samira.ettaqy@company.ma",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c34455be-1763299427331.png",
    photoAlt: "Portrait professionnel de Samira ETTAQY, cheveux longs bruns, blazer bleu marine et chemise blanche"
  };

  const quickStats = [
    { id: 1, label: "Ancienneté", value: "4 ans 2 mois", icon: "Calendar", iconColor: "var(--color-primary)", bgColor: "bg-primary/10" },
    { id: 2, label: "Département", value: "Informatique", icon: "Building2", iconColor: "var(--color-accent)", bgColor: "bg-accent/10" },
    { id: 3, label: "Profil Complété", value: "98%", icon: "CheckCircle2", iconColor: "var(--color-success)", bgColor: "bg-success/10" }
  ];

  const profileSections = [
    { id: 'personal', label: 'Informations Personnelles', icon: 'User' },
    { id: 'contact', label: 'Coordonnées', icon: 'Mail' },
    { id: 'emergency', label: 'Contacts d\'Urgence', icon: 'Phone' },
    { id: 'banking', label: 'Informations Bancaires', icon: 'CreditCard' }
  ];

  const personalDetailsData = {
    firstName: "Samira",
    lastName: "ETTAQY",
    dateOfBirth: "1981-03-12",
    placeOfBirth: "Casablanca, Maroc",
    gender: "female",
    maritalStatus: "married",
    nationality: "Marocaine",
    socialSecurityNumber: "1 81 03 75 116 234 56"
  };

  const contactInformationData = {
    personalEmail: "samira.ettaqy@gmail.com",
    workEmail: "samira.ettaqy@company.ma",
    phoneNumber: "+212 6 12 34 56 78",
    mobileNumber: "+212 6 98 76 54 32",
    address: "Rue Ibn Sina, Quartier Gauthier",
    city: "Casablanca",
    postalCode: "20000",
    country: "Maroc"
  };

  const emergencyContactsData = [
    { id: 1, name: "Ahmed ETTAQY", relationship: "spouse", phoneNumber: "+212 6 23 45 67 89", email: "ahmed.ettaqy@gmail.com" },
    { id: 2, name: "Fatima Zahra ETTAQY", relationship: "parent", phoneNumber: "+212 6 34 56 78 90", email: "fz.ettaqy@gmail.com" }
  ];

  const bankingDetailsData = {
    bankName: "BMCE Bank",
    accountHolderName: "Samira ETTAQY",
    iban: "MA76 3000 6000 0112 3456 7890 189",
    bic: "BMCEMAAM",
    bankAddress: "Boulevard Zerktouni, Casablanca"
  };

  const changeHistory = [
    { id: 1, field: "Adresse Email Personnelle", oldValue: "samira@gmail.com", newValue: "samira.ettaqy@gmail.com", timestamp: "2025-12-01T14:30:00", status: "approved", approvedBy: "Karim El Mansouri (RH)" },
    { id: 2, field: "Numéro de Téléphone", oldValue: "+212 6 11 22 33 44", newValue: "+212 6 12 34 56 78", timestamp: "2025-11-28T09:15:00", status: "approved", approvedBy: "Fatima Zahra Idrissi (RH)" },
    { id: 3, field: "Adresse Postale", oldValue: null, newValue: "Rue Ibn Sina, Quartier Gauthier, Casablanca", timestamp: "2025-11-25T16:45:00", status: "pending" },
    { id: 4, field: "Contact d'Urgence", oldValue: "Anne Martin", newValue: "Ahmed ETTAQY", timestamp: "2025-11-20T11:20:00", status: "approved", approvedBy: "Karim El Mansouri (RH)" }
  ];

  const syncStatus = [
    { id: 1, name: "Système de Paie", icon: "Wallet", status: "synced", lastSync: "2025-12-01T08:00:00" },
    { id: 2, name: "Système RH", icon: "Users", status: "synced", lastSync: "2025-12-01T08:00:00" },
    { id: 3, name: "Avantages Sociaux", icon: "Gift", status: "pending", lastSync: "2025-11-30T18:30:00" },
    { id: 4, name: "Annuaire d'Entreprise", icon: "BookOpen", status: "synced", lastSync: "2025-12-01T07:45:00" }
  ];

  const handleSave = (data) => {
    console.log('Saving data:', data);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => console.log('Changes cancelled');
  const handlePhotoChange = (newPhoto) => console.log('Photo updated:', newPhoto);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalDetailsForm initialData={personalDetailsData} onSave={handleSave} onCancel={handleCancel} />;
      case 'contact':
        return <ContactInformationForm initialData={contactInformationData} onSave={handleSave} onCancel={handleCancel} />;
      case 'emergency':
        return <EmergencyContactsForm initialData={emergencyContactsData} onSave={handleSave} onCancel={handleCancel} />;
      case 'banking':
        return <BankingDetailsForm initialData={bankingDetailsData} onSave={handleSave} onCancel={handleCancel} />;
      default:
        return null;
    }
  };

  const getSectionTitle = () => profileSections.find(s => s.id === activeSection)?.label || '';

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <SidebarNavigation notificationCount={5} />
        <MobileNavigationMenu notificationCount={5} />
        <TopBar currentUser={currentUser} notificationCount={5} />

        <main className="main-content">
          <div className="p-6 lg:p-8">
            {showSuccessMessage && (
              <div className="mb-6 bg-success/10 border border-success/20 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
                <p className="text-sm font-medium text-success">
                  Vos modifications ont été enregistrées avec succès et sont en attente d'approbation.
                </p>
              </div>
            )}

            <div className="mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestion du Profil</h1>
                <p className="text-sm text-muted-foreground">Gérez vos informations personnelles et professionnelles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3">
                <ProfilePhotoUpload currentPhoto={currentUser.photo} currentPhotoAlt={currentUser.photoAlt} onPhotoChange={handlePhotoChange} />
                <QuickStatsCard stats={quickStats} />
                <ProfileSectionNav sections={profileSections} activeSection={activeSection} onSectionChange={setActiveSection} />
              </div>

              <div className="lg:col-span-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon name={profileSections.find(s => s.id === activeSection)?.icon || 'User'} size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{getSectionTitle()}</h2>
                      <p className="text-sm text-muted-foreground">Mettez à jour vos informations ci-dessous</p>
                    </div>
                  </div>

                  {renderActiveSection()}
                </div>
              </div>

              <div className="lg:col-span-3">
                <ChangeHistoryTimeline changes={changeHistory} />
                <SyncStatusCard syncStatus={syncStatus} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeProfileManagement;
