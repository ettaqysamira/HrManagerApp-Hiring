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
import { employeeApi, dashboardApi, candidateApi, presenceApi } from '../../services/api';

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
    absenceRate: 0,
    interviewsPlanned: 0,
    newApplications: 0,
    rejectedApplications: 0,
    todayAbsents: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [empRes, statsRes, candRes, presRes] = await Promise.all([
          employeeApi.getEmployees(),
          dashboardApi.getStats(),
          candidateApi.getCandidats(),
          presenceApi.getPresences()
        ]);

        const employees = empRes.data || [];
        const rawStats = statsRes.data || {};
        const candidates = candRes.data || [];
        const presences = presRes.data || [];

        const computedInterviews = candidates.filter(c => c.status === 'Accepté').length;
        const computedRejected = candidates.filter(c => c.status === 'Rejeté').length;
        const computedNew = candidates.length - computedInterviews - computedRejected;


        let totalSimulatedRecords = 0;
        let totalAbsences = 0;

        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().split('T')[0];
        });

        const now = new Date();
        const hour = now.getHours();

        last7Days.forEach(dateStr => {
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          if (isToday && hour < 13) return;

          employees.forEach(emp => {
            const record = presences.find(p =>
              (p.employeeId === emp.id || p.employeeId === emp.employeeId) &&
              p.date.split('T')[0] === dateStr
            );

            totalSimulatedRecords++;
            if (!record || record.status === 'Absent' || record.status === 'Rejected') {
              totalAbsences++;
            }
          });
        });

        const computedAbsenceRate = totalSimulatedRecords > 0
          ? (totalAbsences / totalSimulatedRecords) * 100
          : 0;

        const todayStr = new Date().toISOString().split('T')[0];
        const todayAbsents = employees.filter(emp => {
          const record = presences.find(p =>
            (p.employeeId === emp.id || p.employeeId === emp.employeeId) &&
            p.date.split('T')[0] === todayStr
          );
          return hour >= 13 && (!record || record.status === 'Absent' || record.status === 'Rejected');
        }).length;

        const normalizedStats = {
          totalEmployees: rawStats.totalEmployees ?? rawStats.TotalEmployees ?? employees.length,
          activeContracts: rawStats.activeContracts ?? rawStats.ActiveContracts ?? 0,
          pendingLeaveRequests: rawStats.pendingLeaveRequests ?? rawStats.PendingLeaveRequests ?? 0,
          openPositions: rawStats.openPositions ?? rawStats.OpenPositions ?? 0,
          expiringContracts: rawStats.expiringContracts ?? rawStats.ExpiringContracts ?? 0,
          totalApplications: candidates.length || rawStats.totalApplications || rawStats.TotalApplications || 0,
          interviewsPlanned: computedInterviews || rawStats.interviewsPlanned || rawStats.InterviewsPlanned || 0,
          newApplications: computedNew || rawStats.newApplications || rawStats.NewApplications || 0,
          rejectedApplications: computedRejected || rawStats.rejectedApplications || rawStats.RejectedApplications || 0,
          absenceRate: parseFloat(computedAbsenceRate.toFixed(1)),
          todayAbsents: todayAbsents,
          AbsenceChartData: rawStats.absenceChartData ?? rawStats.AbsenceChartData ?? [],
          PriorityActions: rawStats.priorityActions ?? rawStats.PriorityActions ?? []
        };
        setStats(normalizedStats);


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
      title: "Absents",
      value: stats.todayAbsents.toString(),
      subtitle: "Absences non justifiées",
      trend: "neutral",
      trendValue: "",
      icon: "UserX",
      iconColor: "#ef4444"
    },
    {
      title: "Entretiens",
      value: stats.interviewsPlanned.toString(),
      subtitle: "Planifiés",
      trend: "neutral",
      trendValue: "",
      icon: "Calendar",
      iconColor: "var(--color-success)"
    },
    {
      title: "Nouveaux",
      value: stats.newApplications.toString(),
      subtitle: "À traiter",
      trend: "up",
      trendValue: "",
      icon: "UserPlus",
      iconColor: "var(--color-accent)"
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

  useEffect(() => {
    if (stats.totalApplications > 0) {
      console.log("Recruitment Stats Received:", {
        total: stats.totalApplications,
        planned: stats.interviewsPlanned,
        rejected: stats.rejectedApplications,
        new: stats.newApplications
      });
    }
  }, [stats]);

  const recruitmentData = [
    { name: "Entretiens planifiés", value: stats.interviewsPlanned },
    { name: "Candidats rejetés", value: stats.rejectedApplications },
    { name: "Nouveaux", value: stats.newApplications }
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