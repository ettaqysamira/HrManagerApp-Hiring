import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import KPICard from './components/KPICard';
import WorkforceChart from './components/WorkforceChart';
import AbsenceChart from './components/AbsenceChart';
import RecruitmentPipeline from './components/RecruitmentPipeline';
import PriorityActionItem from './components/PriorityActionItem';
import SystemStatusIndicator from './components/SystemStatusIndicator';
import FilterToolbar from './components/FilterToolbar';

const HRDashboardOverview = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ dateRange: 'month', department: 'all' });

  const kpiData = [
    {
      title: "Effectif Total",
      value: "1,247",
      subtitle: "Employés actifs",
      trend: "up",
      trendValue: "+3.2%",
      icon: "Users",
      iconColor: "var(--color-primary)",
      onClick: () => navigate('/employee-management')
    },
    {
      title: "Contrats Actifs",
      value: "1,189",
      subtitle: "CDI et CDD",
      trend: "up",
      trendValue: "+1.8%",
      icon: "FileText",
      iconColor: "var(--color-accent)",
      onClick: () => navigate('/contract-administration')
    },
    {
      title: "Demandes de Congés",
      value: "47",
      subtitle: "En attente d\'approbation",
      trend: "down",
      trendValue: "-12%",
      icon: "Calendar",
      iconColor: "var(--color-warning)",
      onClick: () => navigate('/leave-management-system')
    },
    {
      title: "Postes Ouverts",
      value: "23",
      subtitle: "Recrutements en cours",
      trend: "up",
      trendValue: "+5 nouveaux",
      icon: "Briefcase",
      iconColor: "var(--color-success)"
    },
    {
      title: "Taux de Formation",
      value: "87%",
      subtitle: "Programmes complétés",
      trend: "up",
      trendValue: "+4.5%",
      icon: "GraduationCap",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Conformité",
      value: "98.5%",
      subtitle: "Documents à jour",
      trend: "up",
      trendValue: "+0.3%",
      icon: "Shield",
      iconColor: "var(--color-success)"
    },
    {
      title: "Contrats Expirant",
      value: "15",
      subtitle: "Dans les 30 prochains jours",
      trend: "neutral",
      trendValue: null,
      icon: "AlertTriangle",
      iconColor: "var(--color-error)"
    },
    {
      title: "Taux d\'Absence",
      value: "3.2%",
      subtitle: "Ce mois-ci",
      trend: "down",
      trendValue: "-0.8%",
      icon: "UserX",
      iconColor: "var(--color-warning)"
    },
    {
      title: "Masse Salariale",
      value: "€2.4M",
      subtitle: "Mensuel",
      trend: "up",
      trendValue: "+2.1%",
      icon: "Euro",
      iconColor: "var(--color-accent)"
    },
    {
      title: "Candidatures",
      value: "156",
      subtitle: "Ce mois-ci",
      trend: "up",
      trendValue: "+18%",
      icon: "UserPlus",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Turnover",
      value: "8.3%",
      subtitle: "Annuel",
      trend: "down",
      trendValue: "-1.2%",
      icon: "TrendingDown",
      iconColor: "var(--color-success)"
    },
    {
      title: "Satisfaction",
      value: "4.2/5",
      subtitle: "Score moyen",
      trend: "up",
      trendValue: "+0.3",
      icon: "Star",
      iconColor: "var(--color-warning)"
    }
  ];

  const workforceData = [
    { department: "IT", employees: 245 },
    { department: "RH", employees: 87 },
    { department: "Finance", employees: 156 },
    { department: "Ventes", employees: 312 },
    { department: "Marketing", employees: 178 },
    { department: "Opérations", employees: 269 }
  ];

  const absenceData = [
    { month: "Jan", sick: 45, vacation: 120, other: 23 },
    { month: "Fév", sick: 52, vacation: 98, other: 18 },
    { month: "Mar", sick: 38, vacation: 145, other: 31 },
    { month: "Avr", sick: 41, vacation: 167, other: 25 },
    { month: "Mai", sick: 49, vacation: 189, other: 29 },
    { month: "Juin", sick: 36, vacation: 234, other: 22 }
  ];

  const recruitmentData = [
    { name: "Candidatures reçues", value: 156 },
    { name: "Entretiens planifiés", value: 45 },
    { name: "Offres envoyées", value: 12 },
    { name: "Offres acceptées", value: 8 },
    { name: "En attente", value: 23 }
  ];

  const priorityActions = [
    {
      title: "Contrat de Jean Dupont expire dans 15 jours",
      description: "CDI - Département IT - Renouvellement requis",
      priority: "high",
      dueDate: "13/12/2025",
      category: "contract"
    },
    {
      title: "Approbation de congé - Marie Martin",
      description: "Congé annuel du 20/12/2025 au 03/01/2026 (10 jours)",
      priority: "medium",
      dueDate: "05/12/2025",
      category: "leave"
    },
    {
      title: "Candidat en attente - Poste Développeur Senior",
      description: "Pierre Rousseau - Entretien final programmé",
      priority: "high",
      dueDate: "02/12/2025",
      category: "recruitment"
    },
    {
      title: "Formation obligatoire - Sécurité au travail",
      description: "15 employés n\'ont pas complété la formation",
      priority: "medium",
      dueDate: "15/12/2025",
      category: "training"
    },
    {
      title: "Renouvellement de 3 contrats CDD",
      description: "Département Ventes - Décision requise",
      priority: "high",
      dueDate: "08/12/2025",
      category: "contract"
    },
    {
      title: "Validation des congés de fin d\'année",
      description: "23 demandes en attente d\'approbation",
      priority: "medium",
      dueDate: "10/12/2025",
      category: "leave"
    }
  ];

  const systemStatus = [
    {
      name: "Système de Paie",
      status: "operational",
      lastSync: "Il y a 5 minutes"
    },
    {
      name: "LDAP / Active Directory",
      status: "operational",
      lastSync: "Il y a 2 heures"
    },
    {
      name: "Serveur Email",
      status: "degraded",
      lastSync: "Il y a 15 minutes"
    },
    {
      name: "ERP Integration",
      status: "operational",
      lastSync: "Il y a 30 minutes"
    }
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'd' && !e?.ctrlKey && !e?.metaKey) {
        navigate('/hr-dashboard-overview');
      }
      if (e?.key === 'n' && !e?.ctrlKey && !e?.metaKey) {
        console.log('Notifications shortcut triggered');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  const handleExport = () => {
    console.log('Exporting dashboard report to PDF...');
    alert('Rapport du tableau de bord exporté avec succès!');
  };

  const handlePriorityAction = (action) => {
    console.log('Priority action:', action);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Header />
        
        <main className="main-content">
          <Breadcrumb />
          
          <div className="px-6 py-6">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Tableau de Bord RH
              </h1>
              <p className="text-muted-foreground">
                Vue d'ensemble des métriques et activités RH en temps réel
              </p>
            </div>

            <FilterToolbar 
              onFilterChange={handleFilterChange}
              onExport={handleExport}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
              {kpiData?.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 space-y-6">
                <WorkforceChart data={workforceData} />
                <AbsenceChart data={absenceData} />
                <RecruitmentPipeline data={recruitmentData} />
              </div>

              <div className="space-y-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Actions Prioritaires
                  </h3>
                  <div className="space-y-3">
                    {priorityActions?.map((action, index) => (
                      <PriorityActionItem
                        key={index}
                        {...action}
                        onAction={handlePriorityAction}
                      />
                    ))}
                  </div>
                </div>

                <SystemStatusIndicator systems={systemStatus} />
              </div>
            </div>

           

          </div>
        </main>

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default HRDashboardOverview;