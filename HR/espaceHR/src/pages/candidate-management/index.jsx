import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import RecruitmentMetricsCard from './components/RecruitmentMetricsCard';
import CandidateTable from './components/CandidateTable';
import CandidateFilters from './components/CandidateFilters';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import DecisionModal from './components/DecisionModal';

import CandidateService from '../../services/candidate.service';
import JobOfferService from '../../services/jobOffer.service';
import { toast } from 'sonner';

const CandidateManagement = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [activeOffersCount, setActiveOffersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [decisionModal, setDecisionModal] = useState({ open: false, candidate: null, type: null });

  const [filters, setFilters] = useState({
    position: 'all',
    status: 'all',
    source: 'all',
    dateRange: 'all',
    skill: ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [candidates, offers] = await Promise.all([
        CandidateService.getAll(),
        JobOfferService.getAll()
      ]);

      const mappedCandidates = (candidates || []).map(c => ({
        ...c,
        name: c.fullName,
        applicationDate: c.appliedDate,
        position: (c.offreEmploi || c.jobOffer)?.title || 'N/A',
        skills: c.skills ? c.skills.split(',').map(s => s.trim()) : [],
        stage: c.status || 'Nouveau',
        rating: 0,
        source: 'Candidature Directe'
      }));
      setCandidatesData(mappedCandidates);

      const offersList = Array.isArray(offers) ? offers : (offers.value || offers.data || []);
      const activeCount = offersList.filter(o => {
        const s = o.status?.toLowerCase();
        return s === 'open' || s === 'ouvert' || s === 'ouverte';
      }).length;
      setActiveOffersCount(activeCount);

    } catch (error) {
      console.error('Error loading management data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBulkSelection = (selection) => {
    setSelectedCandidates(selection);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDecision = (candidate, type) => {
    setDecisionModal({ open: true, candidate, type });
  };

  const confirmDecision = async (interviewDate) => {
    const { candidate, type } = decisionModal;
    try {
      if (type === 'accept') {
        const dateStr = new Date(interviewDate).toISOString();
        await CandidateService.acceptCandidate(candidate.id, { interviewDate: dateStr });
        toast.success(`Candidature de ${candidate.name} acceptée ! E-mail envoyé.`);
      } else {
        await CandidateService.rejectCandidate(candidate.id);
        toast.success(`Candidature de ${candidate.name} refusée. E-mail envoyé.`);
      }
      setDecisionModal({ open: false, candidate: null, type: null });
      loadData();
    } catch (error) {
      console.error('Error processing decision:', error);
      toast.error('Erreur lors du traitement de la décision');
    }
  };

  const handleExportReport = () => {
    toast.success('Rapport exporté !');
  };

  const metricsData = [
    {
      title: "Postes Actifs",
      value: activeOffersCount.toString(),
      subtitle: "En recrutement",
      trend: "up",
      trendValue: "Live",
      icon: "Briefcase",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Candidatures Totales",
      value: candidatesData.length.toString(),
      subtitle: "Total reçues",
      trend: "up",
      trendValue: "Live",
      icon: "Users",
      iconColor: "var(--color-accent)"
    },
    {
      title: "Entretiens Planifiés",
      value: candidatesData.filter(c => c.stage === 'Accepté').length.toString(),
      subtitle: "Confirmés",
      trend: "up",
      trendValue: "Live",
      icon: "Calendar",
      iconColor: "var(--color-success)"
    }
  ];

  const filteredCandidates = candidatesData.filter(c => {
    if (filters.status !== 'all' && c.stage !== filters.status) return false;
    if (filters.position !== 'all' && c.position !== filters.position) return false;
    if (filters.skill && !c.skills.some(s => s.toLowerCase().includes(filters.skill.toLowerCase())) && !c.name.toLowerCase().includes(filters.skill.toLowerCase())) return false;
    return true;
  });

  const uniquePositions = [...new Set(candidatesData.map(c => c.position))].filter(p => p !== 'N/A');

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <Breadcrumb />
          <main className="flex-1 overflow-y-auto main-content">
            <div className="px-6 py-6 font-sans">
              <div className="mb-6">
                <h1 className="text-3xl font-semibold text-foreground mb-2">Gestion des Candidats</h1>
                <p className="text-muted-foreground">Suivi des candidatures et pipeline de recrutement</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {metricsData.map((metric, index) => (
                  <RecruitmentMetricsCard key={index} {...metric} />
                ))}
              </div>

              <CandidateFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onExport={handleExportReport}
                positions={uniquePositions}
              />

              <div className="mt-8">
                <CandidateTable
                  candidates={filteredCandidates}
                  selectedCandidate={selectedCandidate}
                  selectedCandidates={selectedCandidates}
                  onCandidateSelect={handleCandidateSelect}
                  onBulkSelection={handleBulkSelection}
                  onDecision={handleDecision}
                />
              </div>
            </div>
          </main>
          <QuickActionButton />
        </div>
      </div>
      <DecisionModal
        open={decisionModal.open}
        onClose={() => setDecisionModal({ open: false, candidate: null, type: null })}
        candidate={decisionModal.candidate}
        type={decisionModal.type}
        onConfirm={confirmDecision}
      />
    </SidebarProvider>
  );
};

export default CandidateManagement;