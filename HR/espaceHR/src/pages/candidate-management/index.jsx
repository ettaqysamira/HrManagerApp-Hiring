import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import RecruitmentMetricsCard from './components/RecruitmentMetricsCard';
import CandidateTable from './components/CandidateTable';
import CandidateProfile from './components/CandidateProfile';
import PipelineVisualization from './components/PipelineVisualization';
import CandidateFilters from './components/CandidateFilters';
import BulkActionsToolbar from './components/BulkActionsToolbar';

import CandidateService from '../../services/candidate.service';

const CandidateManagement = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [filters, setFilters] = useState({
    position: 'all',
    status: 'all',
    source: 'all',
    dateRange: 'all',
    skill: '' 
  });

  const metricsData = [
    {
      title: "Postes Actifs",
      value: "23",
      subtitle: "En recrutement",
      trend: "up",
      trendValue: "+3 nouveaux",
      icon: "Briefcase",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Candidatures Totales",
      value: "156",
      subtitle: "Ce mois-ci",
      trend: "up",
      trendValue: "+18%",
      icon: "Users",
      iconColor: "var(--color-accent)"
    },
    {
      title: "Entretiens Planifiés",
      value: "45",
      subtitle: "Cette semaine",
      trend: "up",
      trendValue: "+12",
      icon: "Calendar",
      iconColor: "var(--color-success)"
    },
    {
      title: "Délai Moyen d'Embauche",
      value: "32j",
      subtitle: "Temps d'embauche",
      trend: "down",
      trendValue: "-4 jours",
      icon: "Clock",
      iconColor: "var(--color-warning)"
    }
  ];

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const data = await CandidateService.getAll({ skill: filters.skill });
      const mappedData = data.map(c => ({
        ...c,
        name: c.fullName,
        applicationDate: c.appliedDate,
        position: c.jobOffer ? c.jobOffer.title : 'N/A',
        skills: c.skills ? c.skills.split(',').map(s => s.trim()) : [],
        stage: 'Nouveau',
        rating: 0,
        source: 'Site Carrières',
        experience: 'N/A'
      }));
      setCandidatesData(mappedData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCandidates();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.skill]); 


  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBulkSelection = (candidateIds) => {
    setSelectedCandidates(candidateIds);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  const handleBulkStatusUpdate = (newStatus) => {
    console.log(`Updating ${selectedCandidates?.length} candidates to status: ${newStatus}`);
    alert(`${selectedCandidates?.length} candidats mis à jour avec succès!`);
    setSelectedCandidates([]);
  };

  const handleScheduleInterviews = () => {
    console.log(`Scheduling interviews for ${selectedCandidates?.length} candidates`);
    alert(`Entretiens planifiés pour ${selectedCandidates?.length} candidats!`);
    setSelectedCandidates([]);
  };

  const handleBulkReject = () => {
    if (window.confirm(`Voulez-vous vraiment rejeter ${selectedCandidates?.length} candidats?`)) {
      console.log(`Rejecting ${selectedCandidates?.length} candidates`);
      alert(`${selectedCandidates?.length} candidats rejetés et notifications envoyées.`);
      setSelectedCandidates([]);
    }
  };

  const handleExportReport = () => {
    console.log('Exporting recruitment report...');
    alert('Rapport de recrutement exporté avec succès!');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Header />

        <Breadcrumb />
        <main className="main-content">

          <div className="px-6 py-6">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Gestion des Candidats
              </h1>
              <p className="text-muted-foreground">
                Gestion complète du pipeline de recrutement et suivi des candidatures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {metricsData?.map((metric, index) => (
                <RecruitmentMetricsCard key={index} {...metric} />
              ))}
            </div>

            <CandidateFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onExport={handleExportReport}
            />

            {selectedCandidates?.length > 0 && (
              <BulkActionsToolbar
                selectedCount={selectedCandidates?.length}
                onStatusUpdate={handleBulkStatusUpdate}
                onScheduleInterviews={handleScheduleInterviews}
                onReject={handleBulkReject}
              />
            )}

            <div className="grid grid-cols-1  gap-6">
              <div className="lg:col-span-5 space-y-6">
                <CandidateTable
                  candidates={candidatesData}
                  selectedCandidate={selectedCandidate}
                  selectedCandidates={selectedCandidates}
                  onCandidateSelect={handleCandidateSelect}
                  onBulkSelection={handleBulkSelection}
                  onPhoneClick={() => setShowProfile(true)}
                />


              </div>

              {/*<div className="lg:col-span-4">
                <CandidateProfile candidate={selectedCandidate} />
              </div> */}


              {/*<div className="lg:col-span-3">
                <PipelineVisualization stages={pipelineStages} />
              </div>*/}
            </div>
          </div>
        </main>

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default CandidateManagement;