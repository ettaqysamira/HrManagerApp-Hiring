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

const CandidateManagement = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [filters, setFilters] = useState({
    position: 'all',
    status: 'all',
    source: 'all',
    dateRange: 'all'
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
      title: "Délai Moyen d\'Embauche",
      value: "32j",
      subtitle: "Temps d\'embauche",
      trend: "down",
      trendValue: "-4 jours",
      icon: "Clock",
      iconColor: "var(--color-warning)"
    }
  ];

  const candidatesData = [
    {
      id: 1,
      name: "Samira ETTAQY",
      position: "Développeur Full Stack",
      applicationDate: "2025-11-25",
      stage: "Entretien Technique",
      source: "LinkedIn",
      rating: 4.5,
      email: "sophie.dubois@email.com",
      phone: "+33 6 12 34 56 78",
      experience: "5 ans",
      skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      resumeUrl: "#",
      interviews: [
        { date: "2025-11-28", type: "RH", interviewer: "Marie Martin", notes: "Excellent profil technique" }
      ],
      assessmentScores: { technical: 85, cultural: 90, communication: 88 }
    },
   
    
    {
      id: 5,
      name: "Alae Kamal",
      position: "Développeur Mobile",
      applicationDate: "2025-11-18",
      stage: "Rejeté",
      source: "Indeed",
      rating: 3.5,
      email: "julie.roux@email.com",
      phone: "+33 6 56 78 90 12",
      experience: "2 ans",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      resumeUrl: "#",
      interviews: [
        { date: "2025-11-21", type: "RH", interviewer: "Jean Dupont", notes: "Manque d\'expérience pour le poste" }
      ],
      assessmentScores: { technical: 70, cultural: 75, communication: 72 }
    },
    {
      id: 6,
      name: "Sawsan Hamzaoui",
      position: "DevOps Engineer",
      applicationDate: "2025-11-26",
      stage: "Nouveau",
      source: "LinkedIn",
      rating: 4.3,
      email: "pierre.moreau@email.com",
      phone: "+33 6 67 89 01 23",
      experience: "4 ans",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      resumeUrl: "#",
      interviews: [],
      assessmentScores: { technical: 0, cultural: 0, communication: 0 }
    }
  ];

  const pipelineStages = [
    { name: "Nouveau", count: 23, color: "#4A208A" },
    { name: "Screening Initial", count: 18, color: "#8b5cf6" },
    { name: "Entretien RH", count: 12, color: "#06b6d4" },
    { name: "Entretien Technique", count: 8, color: "#10b981" },
    { name: "Entretien Final", count: 5, color: "#f59e0b" },
    { name: "Offre Envoyée", count: 3, color: "#14b8a6" },
    { name: "Accepté", count: 2, color: "#22c55e" },
    { name: "Rejeté", count: 15, color: "#ef4444" }
  ];

  useEffect(() => {
    if (candidatesData?.length > 0) {
      setSelectedCandidate(candidatesData?.[0]);
    }
  }, []);

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