import { useState, useEffect } from 'react';
import { employeeApi } from '../../services/api';
import { authService } from '../../services/auth.service';
import SidebarNavigation, { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import FilterPanel from './components/FilterPanel';
import LeaveCalendar from './components/LeaveCalendar';
import LeaveRequestCard from './components/LeaveRequestCard';
import LeaveRequestModal from './components/LeaveRequestModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

import { getImageUrl, DEFAULT_AVATAR } from '../../utils/imageUtils';

const LeaveManagementSystemEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [filters, setFilters] = useState({});
  const [savedPresets, setSavedPresets] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const notificationCount = 0;

  const currentUser = authService.getCurrentUser() || { name: 'Employé', role: 'Employee' };

  useEffect(() => {
    document.title = 'Gestion des Congés - EmployeeSpace';
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([
      fetchRequests(),
      fetchBalances()
    ]);
  };

  const fetchBalances = async () => {
    try {
      const response = await employeeApi.getEmployeeStats();
      const lb = response.data?.leaveBalances || response.data?.LeaveBalances;

      if (lb) {
        const paid = lb.paid || lb.Paid || { remaining: 13, total: 25, count: 0 };
        const sick = lb.sick || lb.Sick || { remaining: 8, total: 10, count: 0 };
        const unpaid = lb.unpaid || lb.Unpaid || { remaining: 100, total: 100, count: 0 };
        const recovery = lb.recovery || lb.Recovery || { remaining: 4, total: 5, count: 0 };

        setLeaveBalances([
          { id: 1, type: 'Congés Payés', balance: paid.remaining, total: paid.total, count: paid.count, accrualRate: '+2.08/mois', color: 'bg-blue-500', icon: 'Calendar' },
          { id: 2, type: 'Maladie', balance: sick.remaining, total: sick.total, count: sick.count, accrualRate: 'Variable', color: 'bg-red-500', icon: 'Activity' },
          { id: 3, type: 'Sans Solde', balance: unpaid.remaining, total: unpaid.total, count: unpaid.count, accrualRate: '-', color: 'bg-gray-500', icon: 'Clock' },
          { id: 4, type: 'Récupération', balance: recovery.remaining, total: recovery.total, count: recovery.count, accrualRate: 'Sur demande', color: 'bg-green-500', icon: 'Timer' }
        ]);
      } else {
        setLeaveBalances([
          { id: 1, type: 'Congés Payés', balance: 13, total: 25, count: 0, accrualRate: '+2.08/mois', color: 'bg-blue-500', icon: 'Calendar' },
          { id: 2, type: 'Maladie', balance: 8, total: 10, count: 0, accrualRate: 'Variable', color: 'bg-red-500', icon: 'Activity' },
          { id: 3, type: 'Sans Solde', balance: 100, total: 100, count: 0, accrualRate: '-', color: 'bg-gray-500', icon: 'Clock' },
          { id: 4, type: 'Récupération', balance: 4, total: 5, count: 0, accrualRate: 'Sur demande', color: 'bg-green-500', icon: 'Timer' }
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch leave balances", err);
      setLeaveBalances([
        { id: 1, type: 'Congés Payés', balance: 13, total: 25, count: 0, accrualRate: '+2.08/mois', color: 'bg-blue-500', icon: 'Calendar' },
        { id: 2, type: 'Maladie', balance: 8, total: 10, count: 0, accrualRate: 'Variable', color: 'bg-red-500', icon: 'Activity' },
        { id: 3, type: 'Sans Solde', balance: 100, total: 100, count: 0, accrualRate: '-', color: 'bg-gray-500', icon: 'Clock' },
        { id: 4, type: 'Récupération', balance: 4, total: 5, count: 0, accrualRate: 'Sur demande', color: 'bg-green-500', icon: 'Timer' }
      ]);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await employeeApi.getConges();

      const photo = currentUser?.photo || currentUser?.photoUrl || currentUser?.PhotoUrl;
      const photoSrc = getImageUrl(photo) || DEFAULT_AVATAR;

      const formatLeaveType = (type) => {
        if (!type) return '';
        return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      };

      const mappedRequests = response.data.map(req => ({
        id: req.id,
        leaveType: formatLeaveType(req.leaveType),
        startDate: req.startDate.split('T')[0],
        endDate: req.endDate.split('T')[0],
        status: req.status,
        reason: req.reason,
        duration: req.duration,
        submittedDate: req.createdAt,
        employeeName: currentUser.name,
        employeeAvatar: photoSrc,
        employeeAvatarAlt: currentUser.name,
        department: currentUser.department || currentUser.Department || 'N/A',
        approvalProgress: req.status === 'Approuvé' ? 100 : (req.status === 'Refusé' ? 0 : 50),
      }));
      setLeaveRequests(mappedRequests);
    } catch (err) {
      console.error("Failed to fetch leaves", err);
    }
  };

  const handleNewRequest = () => {
    setIsModalOpen(true);
  };

  const handleSubmitRequest = async (requestData) => {
    try {
      const payload = {
        leaveType: requestData.leaveType,
        startDate: requestData.startDate,
        endDate: requestData.endDate,
        reason: requestData.reason,
        halfDay: requestData.halfDay || false,
        duration: requestData.duration
      };
      await employeeApi.createConge(payload);
      fetchRequests();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to apply for leave", err);
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Erreur lors de la demande.";
      alert(`Erreur: ${errorMessage}`);
    }
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
                        className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                        }
                        aria-label="Vue liste">

                        <Icon name="List" size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
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