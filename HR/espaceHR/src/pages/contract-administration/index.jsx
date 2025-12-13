import React, { useState } from 'react';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import { useSidebar } from '../../components/navigation/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContractStatusCard from './components/ContractStatusCard';
import ContractFilters from './components/ContractFilters';
import ContractTable from './components/ContractTable';
import ContractDetailPanel from './components/ContractDetailPanel';
import BulkActionsBar from './components/BulkActionsBar';

const ContractAdministrationContent = () => {
  const { isCollapsed } = useSidebar();
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedContracts, setSelectedContracts] = useState([]);
  const [filters, setFilters] = useState({
    contractType: 'all',
    department: 'all',
    startDate: '',
    endDate: '',
    savedFilter: 'none',
    searchQuery: ''
  });

  /* =======================
     DONNÉES MAROCAINES
     ======================= */
  const contracts = [
    {
      id: 1,
      employeeName: "Ahmed El Amrani",
      department: "Informatique",
      contractType: "CDI",
      startDate: "01/02/2020",
      endDate: "Indéterminée",
      salary: "9 500 DH",
      status: "active",
      daysUntilExpiration: 999
    },
    {
      id: 2,
      employeeName: "Sara Benjelloun",
      department: "Ressources Humaines",
      contractType: "CDD",
      startDate: "01/06/2024",
      endDate: "30/11/2024",
      salary: "7 200 DH",
      status: "expiring",
      daysUntilExpiration: 20
    },
    {
      id: 3,
      employeeName: "Youssef Ait Lahcen",
      department: "Finance",
      contractType: "CDI",
      startDate: "15/03/2019",
      endDate: "Indéterminée",
      salary: "11 000 DH",
      status: "active",
      daysUntilExpiration: 999
    },
    {
      id: 4,
      employeeName: "Khadija Ouazzani",
      department: "Commercial",
      contractType: "CDD",
      startDate: "01/09/2024",
      endDate: "28/02/2025",
      salary: "6 800 DH",
      status: "expiring",
      daysUntilExpiration: 70
    },
    {
      id: 5,
      employeeName: "Mohamed Zahidi",
      department: "Logistique",
      contractType: "CDI",
      startDate: "10/05/2021",
      endDate: "Indéterminée",
      salary: "8 200 DH",
      status: "active",
      daysUntilExpiration: 999
    },
    {
      id: 6,
      employeeName: "Imane El Fassi",
      department: "Marketing",
      contractType: "Stage",
      startDate: "01/10/2024",
      endDate: "31/03/2025",
      salary: "2 000 DH",
      status: "active",
      daysUntilExpiration: 140
    },
    {
      id: 7,
      employeeName: "Rachid Berrada",
      department: "Informatique",
      contractType: "CDD",
      startDate: "01/07/2024",
      endDate: "31/12/2024",
      salary: "7 500 DH",
      status: "expiring",
      daysUntilExpiration: 30
    },
    {
      id: 8,
      employeeName: "Nour Eddine Chraibi",
      department: "Maintenance",
      contractType: "Intérim",
      startDate: "01/11/2024",
      endDate: "31/01/2025",
      salary: "5 500 DH",
      status: "pending",
      daysUntilExpiration: 60
    },
    {
      id: 9,
      employeeName: "Salma Tazi",
      department: "Finance",
      contractType: "CDI",
      startDate: "20/01/2022",
      endDate: "Indéterminée",
      salary: "10 300 DH",
      status: "active",
      daysUntilExpiration: 999
    },
    {
      id: 10,
      employeeName: "Hamza Mernissi",
      department: "Commercial",
      contractType: "CDD",
      startDate: "01/08/2024",
      endDate: "31/01/2025",
      salary: "6 500 DH",
      status: "pending",
      daysUntilExpiration: 63
    }
  ];

  /* =======================
     HANDLERS
     ======================= */
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      contractType: 'all',
      department: 'all',
      startDate: '',
      endDate: '',
      savedFilter: 'none',
      searchQuery: ''
    });
  };

  const handleApplyFilters = () => {
    console.log('Filtres appliqués :', filters);
  };

  const handleSelectContract = (id, checked) => {
    setSelectedContracts(prev =>
      checked ? [...prev, id] : prev.filter(contractId => contractId !== id)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedContracts(checked ? contracts.map(c => c.id) : []);
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Breadcrumb />

        <div className="px-6 py-6 bg-background min-h-screen">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Administration des Contrats</h1>
              <p className="text-muted-foreground">
                Gestion des contrats de travail – contexte marocain
              </p>
            </div>
            <Button variant="default" iconName="Plus">
              Nouveau Contrat
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <ContractStatusCard title="Contrats Actifs" count="185" icon="FileCheck" />
            <ContractStatusCard title="Expire bientôt" count="14" icon="AlertCircle" />
            <ContractStatusCard title="En attente" count="6" icon="Clock" />
            <ContractStatusCard title="Expirés" count="4" icon="XCircle" />
          </div>

          <ContractFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            onApply={handleApplyFilters}
          />

          <ContractTable
            contracts={contracts}
            selectedContracts={selectedContracts}
            onSelectContract={handleSelectContract}
            onSelectAll={handleSelectAll}
            onViewDetails={setSelectedContract}
          />

          <ContractDetailPanel
            contract={selectedContract}
            onClose={() => setSelectedContract(null)}
          />

          <BulkActionsBar
            selectedCount={selectedContracts.length}
            onClearSelection={() => setSelectedContracts([])}
          />
        </div>
      </div>
      <QuickActionButton />
    </>
  );
};

const ContractAdministration = () => (
  <SidebarProvider>
    <ContractAdministrationContent />
  </SidebarProvider>
);

export default ContractAdministration;
