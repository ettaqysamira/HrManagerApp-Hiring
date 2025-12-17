import React, { useState, useEffect } from 'react';
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
import QRCodeDisplay from '../qr-code-attendance-system/components/QRCodeDisplay';

const EmployeeProfileManagement = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const calculateSeniority = (startDate) => {
    if (!startDate) return "—";
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) return `${years} an${years > 1 ? 's' : ''} ${months > 0 ? `${months} mois` : ''}`;
    if (months > 0) return `${months} mois`;
    return `${diffDays} jours`;
  };

  const currentUser = {
    name: userData ? `${userData.firstName} ${userData.lastName}` : "Employé",
    role: userData?.position || "Collaborateur",
    email: userData?.email || "",
    photo: userData?.photoUrl || null,
    photoAlt: `Photo de ${userData?.firstName || 'profil'}`
  };

  const quickStats = [
    { id: 1, label: "Ancienneté", value: calculateSeniority(userData?.startDate), icon: "Calendar", iconColor: "var(--color-primary)", bgColor: "bg-primary/10" },
    { id: 2, label: "Département", value: userData?.department || "—", icon: "Building2", iconColor: "var(--color-accent)", bgColor: "bg-accent/10" },
    { id: 3, label: "Statut", value: userData?.status || "Actif", icon: "CircleCheck", iconColor: "var(--color-success)", bgColor: "bg-success/10" }
  ];

  const profileSections = [
    { id: 'personal', label: 'Informations Personnelles', icon: 'User' },
    { id: 'contact', label: 'Coordonnées', icon: 'Mail' },
    { id: 'emergency', label: 'Contacts d\'Urgence', icon: 'Phone' },
    { id: 'banking', label: 'Informations Bancaires', icon: 'CreditCard' }
  ];

  const personalDetailsData = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    dateOfBirth: userData?.birthDate || "",
    placeOfBirth: "—",
    gender: "—",
    maritalStatus: "—",
    nationality: "—",
    socialSecurityNumber: "—"
  };

  const contactInformationData = {
    personalEmail: userData?.email || "",
    workEmail: userData?.email || "",
    phoneNumber: userData?.phone || "",
    mobileNumber: userData?.phone || "",
    address: userData?.address || "",
    city: "—",
    postalCode: "—",
    country: "—"
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

  const handleSave = async (data) => {
    try {
      const url = `http://localhost:5076/api/Employees/${userData?.id}/profile`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: data.phoneNumber || data.mobileNumber,
          address: data.address,
          email: data.personalEmail,
          birthDate: data.dateOfBirth,
          placeOfBirth: data.placeOfBirth,
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          nationality: data.nationality,
          socialSecurityNumber: data.socialSecurityNumber
        })
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        const updatedUser = { ...userData, ...data };
        if (data.phoneNumber) updatedUser.phone = data.phoneNumber;
        if (data.personalEmail) updatedUser.email = data.personalEmail;
        if (data.dateOfBirth) updatedUser.birthDate = data.dateOfBirth;

        setUserData(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        console.error("Failed to save profile");
        alert("Erreur lors de l'enregistrement via API.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Erreur réseau.");
    }
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

  const employeeQRData = {
    name: currentUser.name,
    employeeId: userData?.employeeId || "PENDING",
    department: userData?.department || "—",
    position: userData?.position || "—"
  };

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
                <div className="mb-6">
                  <QRCodeDisplay employeeData={employeeQRData} onRegenerate={() => console.log("Regenerate requested")} />
                </div>
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
