import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import AbsenceMetricCard from './components/AbsenceMetricCard';
import AbsenceHeatmap from './components/AbsenceHeatmap';
import DepartmentComparison from './components/DepartmentComparison';
import LeaveTypeDistribution from './components/LeaveTypeDistribution';
import AbsenceForecasting from './components/AbsenceForecasting';
import AnalyticsControlPanel from './components/AnalyticsControlPanel';
import CostImpactAnalysis from './components/CostImpactAnalysis';
import ComplianceAlerts from './components/ComplianceAlerts';

const AbsenceAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    department: 'all',
    employeeGroup: 'all',
    absenceType: 'all',
    timePeriod: 'quarter'
  });

  const metricsData = [
    {
      title: "Taux d\'Absence Moyen",
      value: "3.2%",
      subtitle: "Ce trimestre",
      trend: "down",
      trendValue: "-0.5%",
      icon: "UserX",
      iconColor: "var(--color-warning)"
    },
    {
      title: "Jours d\'Absence Totaux",
      value: "2,847",
      subtitle: "Ce trimestre",
      trend: "up",
      trendValue: "+156 jours",
      icon: "Calendar",
      iconColor: "var(--color-error)"
    },
    {
      title: "Impact sur la Productivité",
      value: "12.8%",
      subtitle: "Perte estimée",
      trend: "down",
      trendValue: "-2.1%",
      icon: "TrendingDown",
      iconColor: "var(--color-accent)"
    },
    {
      title: "Coût Total des Absences",
      value: "384K",
      subtitle: "Ce trimestre",
      trend: "up",
      trendValue: "+23K",
      icon: "Euro",
      iconColor: "var(--color-primary)"
    }
  ];

  const heatmapData = [
    { day: 'Lun', week1: 12, week2: 15, week3: 18, week4: 14, week5: 16 },
    { day: 'Mar', week1: 10, week2: 13, week3: 16, week4: 11, week5: 14 },
    { day: 'Mer', week1: 14, week2: 17, week3: 20, week4: 15, week5: 18 },
    { day: 'Jeu', week1: 11, week2: 14, week3: 17, week4: 13, week5: 15 },
    { day: 'Ven', week1: 16, week2: 19, week3: 22, week4: 18, week5: 20 }
  ];

  const departmentData = [
    { department: 'IT', absenceRate: 2.8, avgDuration: 3.5, cost: 45000 },
    { department: 'RH', absenceRate: 3.2, avgDuration: 4.2, cost: 28000 },
    { department: 'Finance', absenceRate: 2.5, avgDuration: 3.1, cost: 39000 },
    { department: 'Ventes', absenceRate: 4.1, avgDuration: 5.3, cost: 78000 },
    { department: 'Marketing', absenceRate: 3.5, avgDuration: 4.5, cost: 52000 },
    { department: 'Opérations', absenceRate: 3.8, avgDuration: 4.8, cost: 68000 }
  ];

  const leaveTypeData = [
    { name: 'Congé Maladie', value: 845, percentage: 35, color: '#ef4444' },
    { name: 'Congé Annuel', value: 1234, percentage: 51, color: '#4A208A' },
    { name: 'Congé Familial', value: 234, percentage: 9, color: '#8b5cf6' },
    { name: 'Formation', value: 123, percentage: 5, color: '#06b6d4' }
  ];

  const forecastingData = [
    { month: 'Jan', actual: 245, predicted: 240, confidence: 95 },
    { month: 'Fév', actual: 268, predicted: 265, confidence: 94 },
    { month: 'Mar', actual: 289, predicted: 285, confidence: 93 },
    { month: 'Avr', actual: 312, predicted: 310, confidence: 92 },
    { month: 'Mai', actual: 334, predicted: 335, confidence: 91 },
    { month: 'Juin', actual: 356, predicted: 360, confidence: 90 },
    { month: 'Juil', actual: null, predicted: 385, confidence: 88 },
    { month: 'Août', actual: null, predicted: 410, confidence: 85 },
    { month: 'Sep', actual: null, predicted: 370, confidence: 82 }
  ];

  const costImpactData = {
    directCosts: 284000,
    indirectCosts: 156000,
    productivityLoss: 98000,
    replacementCosts: 67000,
    totalImpact: 605000
  };

  const complianceAlerts = [
    {
      severity: 'high',
      title: 'Dépassement du seuil d\'absence',
      description: 'Département Ventes: 15 employés dépassent 10 jours d\'absence',
      action: 'Révision requise',
      dueDate: '2025-12-05'
    },
    {
      severity: 'medium',
      title: 'Renouvellement des certificats médicaux',
      description: '8 certificats médicaux expirent dans 7 jours',
      action: 'Demande de renouvellement',
      dueDate: '2025-12-08'
    },
    {
      severity: 'low',
      title: 'Analyse des tendances saisonnières',
      description: 'Tendance à la hausse détectée pour décembre',
      action: 'Planification préventive',
      dueDate: '2025-12-15'
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Analytics filters applied:', newFilters);
  };

  const handleExportReport = (format) => {
    console.log(`Exporting absence analytics report in ${format} format...`);
    alert(`Rapport analytique exporté avec succès en format ${format?.toUpperCase()}!`);
  };

  const handleAlertAction = (alert) => {
    console.log('Taking action on alert:', alert);
    alert(`Action initiée pour: ${alert?.title}`);
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
                Tableau de Bord Analytique des Absences
              </h1>
              <p className="text-muted-foreground">
                Analyse complète des tendances d'absence et insights pour la planification de la main-d'œuvre
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {metricsData?.map((metric, index) => (
                <AbsenceMetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <AnalyticsControlPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onExport={handleExportReport}
                />
              </div>
              <div>
                <ComplianceAlerts 
                  alerts={complianceAlerts}
                  onAlertAction={handleAlertAction}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <AbsenceHeatmap data={heatmapData} />
              <LeaveTypeDistribution data={leaveTypeData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <AbsenceForecasting data={forecastingData} />
              </div>
              <div>
                <CostImpactAnalysis data={costImpactData} />
              </div>
            </div>

            <DepartmentComparison data={departmentData} />

           
          </div>
        </main>

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default AbsenceAnalyticsDashboard;