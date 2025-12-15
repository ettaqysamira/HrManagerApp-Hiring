import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import LeaveCalendar from './components/LeaveCalendar';
import LeaveRequestCard from './components/LeaveRequestCard';
import LeaveRequestModal from './components/LeaveRequestModal';
import FilterPanel from './components/FilterPanel';

const LeaveManagementSystemEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filters, setFilters] = useState({});
  const [savedPresets, setSavedPresets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  const currentUser = {
    name: 'Samira Ettaqy',
    role: 'Employée',
    email: 'samira.ettaqy@company.ma',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b73b4346-1763297697315.png",
    avatarAlt: 'Photo professionnelle de Samira Ettaqy avec cheveux bruns courts et chemise blanche'
  };

  const leaveBalances = [
    { id: 1, type: 'Congés Payés', balance: 18, total: 25, accrualRate: '2.08 jours/mois', color: 'bg-primary', icon: 'Calendar' },
    { id: 2, type: 'Congés Maladie', balance: 8, total: 10, accrualRate: '0.83 jours/mois', color: 'bg-error', icon: 'Heart' },
    { id: 3, type: 'Congés Sans Solde', balance: 5, total: 5, accrualRate: 'Sur demande', color: 'bg-warning', icon: 'AlertCircle' },
    { id: 4, type: 'Congés Formation', balance: 3, total: 5, accrualRate: '0.42 jours/mois', color: 'bg-accent', icon: 'GraduationCap' }
  ];


  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: 'Samira Ettaqy',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b73b4346-1763297697315.png",
      employeeAvatarAlt: 'Photo professionnelle de Samira Ettaqy avec cheveux bruns courts et chemise blanche',
      department: 'Développement',
      leaveType: 'Congés Payés',
      startDate: '2025-12-15',
      endDate: '2025-12-22',
      duration: 8,
      status: 'Approuvé',
      reason: 'Vacances de fin d\'année avec la famille',
      submittedDate: '2025-11-15T10:30:00',
      approvalProgress: 100,
      approvers: [{ name: 'Manager', initials: 'AB', approved: true }, { name: 'RH', initials: 'ML', approved: true }]
    },
    {
      id: 2,
      employeeName: 'Mohamed Tazi',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea3461a7-1763301220913.png",
      employeeAvatarAlt: 'Photo professionnelle de Mohamed Tazi avec cheveux noirs courts et costume gris',
      department: 'Marketing',
      leaveType: 'Congés Maladie',
      startDate: '2025-12-05',
      endDate: '2025-12-06',
      duration: 2,
      status: 'En attente',
      reason: 'Consultation médicale spécialisée',
      submittedDate: '2025-11-28T14:20:00',
      approvalProgress: 50,
      approvers: [{ name: 'Manager', initials: 'AB', approved: true }, { name: 'RH', initials: 'ML', approved: false }]
    },
    {
      id: 3,
      employeeName: 'Fatima Zahra Idrissi',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11dfc6731-1763299430366.png",
      employeeAvatarAlt: 'Photo professionnelle de Fatima Zahra Idrissi avec cheveux roux et lunettes',
      department: 'RH',
      leaveType: 'Congés Payés',
      startDate: '2025-12-10',
      endDate: '2025-12-12',
      duration: 3,
      status: 'Approuvé',
      reason: 'Week-end prolongé pour événement familial',
      submittedDate: '2025-11-20T09:15:00',
      approvalProgress: 100,
      approvers: [{ name: 'Manager', initials: 'AS', approved: true }, { name: 'RH', initials: 'ML', approved: true }]
    },
    {
      id: 4,
      employeeName: 'Youssef Bensaid',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1309f1322-1763296767839.png",
      employeeAvatarAlt: 'Photo professionnelle de Youssef Bensaid avec barbe courte et pull bleu',
      department: 'Finance',
      leaveType: 'Congés Formation',
      startDate: '2025-12-08',
      endDate: '2025-12-09',
      duration: 2,
      status: 'En attente',
      reason: 'Formation professionnelle en finance',
      submittedDate: '2025-11-25T11:45:00',
      approvalProgress: 33,
      approvers: [{ name: 'Manager', initials: 'PL', approved: true }, { name: 'RH', initials: 'ML', approved: false }, { name: 'Directeur', initials: 'RC', approved: false }]
    },
    {
      id: 5,
      employeeName: 'Khadija El Fassi',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_138e492ac-1763297226301.png",
      employeeAvatarAlt: 'Photo professionnelle de Khadija El Fassi avec cheveux noirs et écharpe rouge',
      department: 'IT',
      leaveType: 'Congés Payés',
      startDate: '2025-11-20',
      endDate: '2025-11-22',
      duration: 3,
      status: 'Rejeté',
      reason: 'Demande tardive pour période de forte activité',
      submittedDate: '2025-11-18T16:30:00',
      approvalProgress: 0,
      approvers: [{ name: 'Manager', initials: 'ND', approved: false }]
    },
    {
      id: 6,
      employeeName: 'Rachid El Amrani',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112193a91-1763294779964.png",
      employeeAvatarAlt: 'Photo professionnelle de Rachid El Amrani avec cheveux gris et costume noir',
      department: 'Ventes',
      leaveType: 'Congés Payés',
      startDate: '2025-12-18',
      endDate: '2025-12-20',
      duration: 3,
      status: 'Approuvé',
      reason: 'Repos et récupération',
      submittedDate: '2025-11-10T08:00:00',
      approvalProgress: 100,
      approvers: [{ name: 'Manager', initials: 'SB', approved: true }, { name: 'Directeur', initials: 'RC', approved: true }]
    },
    {
      id: 7,
      employeeName: 'Salma Lahlou',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0b928c0-1763296854463.png",
      employeeAvatarAlt: 'Photo professionnelle de Salma Lahlou avec cheveux bruns et chemise blanche',
      department: 'Développement',
      leaveType: 'Congés Sans Solde',
      startDate: '2026-01-15',
      endDate: '2026-01-17',
      duration: 3,
      status: 'En attente',
      reason: 'Projet personnel nécessitant absence temporaire',
      submittedDate: '2025-11-29T10:00:00',
      approvalProgress: 0,
      approvers: [{ name: 'Manager', initials: 'JD', approved: false }, { name: 'RH', initials: 'ML', approved: false }]
    },
    {
      id: 8,
      employeeName: 'Amine Choukrallah',
      employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112193a91-1763294779964.png",
      employeeAvatarAlt: 'Photo professionnelle de Amine Choukrallah avec cheveux noirs et costume gris',
      department: 'Marketing',
      leaveType: 'Congés Payés',
      startDate: '2025-12-23',
      endDate: '2025-12-30',
      duration: 8,
      status: 'Approuvé',
      reason: 'Vacances de Noël avec la famille élargie',
      submittedDate: '2025-11-05T13:20:00',
      approvalProgress: 100,
      approvers: [{ name: 'Manager', initials: 'CB', approved: true }, { name: 'RH', initials: 'ML', approved: true }]
    }
  ]);
  const notificationCount = 3;

  useEffect(() => {
    document.title = 'Gestion des Congés - EmployeeSpace';
  }, []);

  const handleNewRequest = () => {
    setIsModalOpen(true);
  };

  const handleSubmitRequest = (requestData) => {
    const newRequest = {
      id: leaveRequests?.length + 1,
      employeeName: currentUser?.name,
      employeeAvatar: currentUser?.avatar,
      employeeAvatarAlt: currentUser?.avatarAlt,
      department: 'Développement',
      ...requestData,
      approvalProgress: 0,
      approvers: [
      { name: 'Manager', initials: 'JD', approved: false },
      { name: 'RH', initials: 'ML', approved: false }]

    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setIsModalOpen(false);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleApprove = (request) => {
    console.log('Approuver:', request);
  };

  const handleReject = (request) => {
    console.log('Rejeter:', request);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSavePreset = (preset) => {
    setSavedPresets([...savedPresets, preset]);
  };

  const handleDateSelect = (day) => {
    console.log('Date sélectionnée:', day);
  };

  const handleBulkAction = (action) => {
    console.log('Action groupée:', action, selectedRequests);
  };

  const filteredRequests = leaveRequests?.filter((request) => {
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      if (!request?.employeeName?.toLowerCase()?.includes(query) &&
      !request?.leaveType?.toLowerCase()?.includes(query) &&
      !request?.status?.toLowerCase()?.includes(query)) {
        return false;
      }
    }
    return true;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <SidebarNavigation notificationCount={notificationCount} />
        <MobileNavigationMenu notificationCount={notificationCount} />
        <TopBar currentUser={currentUser} notificationCount={notificationCount} />
        
        <main className="main-content">
          <div className="p-6 lg:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Congés</h1>
                <p className="text-muted-foreground">
                  Gérez vos demandes de congés et suivez vos soldes disponibles
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={() => console.log('Exporter')}>

                  Exporter
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleNewRequest}>

                  Nouvelle Demande
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leaveBalances?.map((balance) =>
              <LeaveBalanceCard key={balance?.id} {...balance} />
              )}
            </div>

            <FilterPanel
              onFilterChange={handleFilterChange}
              onSavePreset={handleSavePreset}
              savedPresets={savedPresets} />


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <LeaveCalendar
                  leaveRequests={leaveRequests}
                  onDateSelect={handleDateSelect} />

              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="relative flex-1 w-full sm:max-w-md">
                      <Icon
                        name="Search"
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

                      <input
                        type="text"
                        placeholder="Rechercher une demande..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200" />

                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                        viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                        }
                        aria-label="Vue liste">

                        <Icon name="List" size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                        viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                        }
                        aria-label="Vue grille">

                        <Icon name="Grid" size={20} />
                      </button>
                    </div>
                  </div>

                  {selectedRequests?.length > 0 &&
                  <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-between">
                      <span className="text-sm font-medium text-accent">
                        {selectedRequests?.length} demande{selectedRequests?.length > 1 ? 's' : ''} sélectionnée{selectedRequests?.length > 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                        variant="outline"
                        size="sm"
                        iconName="Check"
                        onClick={() => handleBulkAction('approve')}>

                          Approuver
                        </Button>
                        <Button
                        variant="outline"
                        size="sm"
                        iconName="X"
                        onClick={() => handleBulkAction('reject')}>

                          Rejeter
                        </Button>
                      </div>
                    </div>
                  }

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Demandes de Congés ({filteredRequests?.length})
                    </h3>
                    <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                      Voir l'historique complet
                    </button>
                  </div>
                </div>

                <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {filteredRequests?.length > 0 ?
                  filteredRequests?.map((request) =>
                  <LeaveRequestCard
                    key={request?.id}
                    request={request}
                    onViewDetails={handleViewDetails}
                    onApprove={handleApprove}
                    onReject={handleReject} />

                  ) :

                  <div className="bg-card rounded-lg border border-border p-12 text-center">
                      <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Aucune demande trouvée</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Aucune demande ne correspond à vos critères de recherche
                      </p>
                      <Button
                      variant="default"
                      iconName="Plus"
                      onClick={handleNewRequest}>

                        Créer une Demande
                      </Button>
                    </div>
                  }
                </div>
              </div>
            </div>

            
          </div>
        </main>

        <LeaveRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitRequest}
          leaveBalances={leaveBalances} />

      </div>
    </SidebarProvider>);

};

export default LeaveManagementSystemEmployee;