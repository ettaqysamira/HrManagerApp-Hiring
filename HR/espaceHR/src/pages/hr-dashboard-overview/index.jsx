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
import { employeeApi, dashboardApi } from '../../services/api';

const HRDashboardOverview = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ dateRange: 'month', department: 'all' });
  const [workforceData, setWorkforceData] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeContracts: 0,
    pendingLeaveRequests: 0,
    openPositions: 0,
    expiringContracts: 0,
    totalApplications: 0,
    absenceRate: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [empRes, statsRes] = await Promise.all([
          employeeApi.getEmployees(),
          dashboardApi.getStats()
        ]);

        const employees = empRes.data;
        setStats(statsRes.data);


        const standardDepartments = ["IT", "Marketing", "Finance", "RH", "Commercial", "Production"];


        const initialCounts = standardDepartments.reduce((acc, dept) => ({ ...acc, [dept]: 0 }), {});


        const departmentCounts = employees.reduce((acc, emp) => {
          const dept = emp.department || 'Non assigné';
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, initialCounts);

        const chartData = Object.entries(departmentCounts).map(([name, count]) => ({
          department: name,
          employees: count
        }));

        setWorkforceData(chartData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const kpiData = [
    {
      title: "Effectif Total",
      value: stats.totalEmployees.toLocaleString(),
      subtitle: "Employés actifs",
      trend: "up",
      trendValue: "",
      icon: "Users",
      iconColor: "var(--color-primary)",
      onClick: () => navigate('/employee-management')
    },
    {
      title: "Contrats Actifs",
      value: stats.activeContracts.toLocaleString(),
      subtitle: "CDI et CDD",
      trend: "up",
      trendValue: "",
      icon: "FileText",
      iconColor: "var(--color-accent)",
      onClick: () => navigate('/contract-administration')
    },
    {
      title: "Demandes de Congés",
      value: stats.pendingLeaveRequests.toString(),
      subtitle: "En attente d'approbation",
      trend: "neutral",
      trendValue: "",
      icon: "Calendar",
      iconColor: "var(--color-warning)",
      onClick: () => navigate('/leave-management-system')
    },
    {
      title: "Postes Ouverts",
      value: stats.openPositions.toString(),
      subtitle: "Recrutements en cours",
      trend: "neutral",
      trendValue: "",
      icon: "Briefcase",
      iconColor: "var(--color-success)"
    },
    {
      title: "Contrats Expirant",
      value: stats.expiringContracts.toString(),
      subtitle: "Dans les 30 prochains jours",
      trend: "neutral",
      trendValue: null,
      icon: "AlertTriangle",
      iconColor: "var(--color-error)"
    },
    {
      title: "Taux d'Absence",
      value: `${stats.absenceRate}%`,
      subtitle: "Derniers 30 jours",
      trend: "neutral",
      trendValue: "",
      icon: "UserX",
      iconColor: "var(--color-warning)"
    },
    {
      title: "Candidatures",
      value: stats.totalApplications.toString(),
      subtitle: "Total reçues",
      trend: "up",
      trendValue: "",
      icon: "UserPlus",
      iconColor: "var(--color-primary)"
    },
  ];



  const absenceData = stats.AbsenceChartData && stats.AbsenceChartData.length > 0
    ? stats.AbsenceChartData
    : [
      { month: "Juillet", sick: 0, vacation: 0, other: 0 },
      { month: "Août", sick: 0, vacation: 0, other: 0 },
      { month: "Sept", sick: 0, vacation: 0, other: 0 },
      { month: "Oct", sick: 0, vacation: 0, other: 0 },
      { month: "Nov", sick: 0, vacation: 0, other: 0 },
      { month: "Déc", sick: 0, vacation: 0, other: 0 }
    ];

  const recruitmentData = [
    { name: "Candidatures reçues", value: stats.totalApplications },
    { name: "Entretiens planifiés", value: 45 },
    { name: "Offres envoyées", value: 12 },
    { name: "Offres acceptées", value: 8 },
    { name: "En attente", value: 23 }
  ];

  const priorityActions = stats.PriorityActions && stats.PriorityActions.length > 0
    ? stats.PriorityActions
    : [
      {
        title: "Aucune action prioritaire",
        description: "Tout est à jour.",
        priority: "low",
        dueDate: "-",
        category: "system"
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