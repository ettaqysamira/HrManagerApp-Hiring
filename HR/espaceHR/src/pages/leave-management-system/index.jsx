import { employeeApi } from '../../services/api';
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import FilterPanel from './components/FilterPanel';
import CalendarView from './components/CalendarView';
import TeamAvailabilityHeatmap from './components/TeamAvailabilityHeatmap';
import LeaveRequestCard from './components/LeaveRequestCard';
import LeaveDetailsPanel from './components/LeaveDetailsPanel';
import BulkApprovalToolbar from './components/BulkApprovalToolbar';

const LeaveManagementSystemHR = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filters, setFilters] = useState({ status: 'all', leaveType: 'all', search: '' });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ status: 'all', leaveType: 'all', search: '' });
  };

  const leaveEvents = [];

  const availabilityData = [
    { department: 'Informatique', available: 8, total: 10, percentage: 80 },
    { department: 'Finance', available: 5, total: 5, percentage: 100 },
    { department: 'RH', available: 3, total: 4, percentage: 75 }
  ];

  const employees = [
    {
      id: 1,
      name: 'Samira ETTAQY',
      initials: 'SM',
      department: 'Informatique',
      balances: [
        { type: 'Congés', used: 15, total: 25, remaining: 10, color: '#4A208A' },
        { type: 'Maladie', used: 2, total: 10, remaining: 8, color: '#EF4444' },
        { type: 'Personnel', used: 1, total: 5, remaining: 4, color: '#10B981' }]

    },
    {
      id: 2,
      name: 'Sawsan Hamzaoui',
      initials: 'TD',
      department: 'Finance',
      balances: [
        { type: 'Congés', used: 20, total: 25, remaining: 5, color: '#4A208A' },
        { type: 'Maladie', used: 5, total: 10, remaining: 5, color: '#EF4444' },
        { type: 'Personnel', used: 3, total: 5, remaining: 2, color: '#10B981' }]

    },
    {
      id: 3,
      name: 'Marie Alae',
      initials: 'MR',
      department: 'RH',
      balances: [
        { type: 'Congés', used: 10, total: 25, remaining: 15, color: '#4A208A' },
        { type: 'Maladie', used: 1, total: 10, remaining: 9, color: '#EF4444' },
        { type: 'Personnel', used: 0, total: 5, remaining: 5, color: '#10B981' }]

    }];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await employeeApi.getConges();
      if (response.data) {
        const mappedRequests = response.data.map(req => ({
          id: req.id,
          employeeName: req.employee ? `${req.employee.firstName} ${req.employee.lastName}` : 'Employé Inconnu',
          employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
          department: req.employee?.department || 'N/A',
          position: req.employee?.jobTitle || 'N/A',
          type: req.leaveType || '',
          typeLabel: formatLeaveType(req.leaveType || ''),
          status: (req.status || 'En attente'), 
          startDate: (req.startDate || '').split('T')[0],
          endDate: (req.endDate || '').split('T')[0],
          duration: req.duration || 0,
          reason: req.reason || '',
          submittedDate: (req.createdAt || '').split('T')[0],
          approverComments: null
        }));

        const statusMap = {
          "En attente": "pending",
          "Approuvé": "approved",
          "Refusé": "rejected",
          "en attente": "pending",
          "approuvé": "approved",
          "refusé": "rejected"
        };

        const finalRequests = mappedRequests.map(r => ({
          ...r,
          status: statusMap[r.status] || statusMap[r.status?.toLowerCase()] || 'pending'
        }));

        setLeaveRequests(finalRequests);
      }
    } catch (err) {
      console.error("Failed to fetch leave requests", err);
    }
  };

  const formatLeaveType = (type) => {
    if (!type) return '';
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const handleApprove = async (requestId) => {
    try {
      await employeeApi.updateCongeStatus(requestId, "Approuvé");
      alert(`Demande ${requestId} approuvée avec succès`);
      fetchRequests(); 
    } catch (err) {
      console.error("Error approving request", err);
      alert("Erreur lors de l'approbation");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await employeeApi.updateCongeStatus(requestId, "Refusé");
      alert(`Demande ${requestId} rejetée`);
      fetchRequests(); 
    } catch (err) {
      console.error("Error rejecting request", err);
      alert("Erreur lors du rejet");
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleToggleSelection = (requestId) => {
    setSelectedRequests((prev) =>
      prev?.includes(requestId) ?
        prev?.filter((id) => id !== requestId) :
        [...prev, requestId]
    );
  };

  const handleApproveAll = () => {
    console.log('Approving all selected:', selectedRequests);
    alert(`${selectedRequests?.length} demandes approuvées`);
    setSelectedRequests([]);
  };

  const handleRejectAll = () => {
    console.log('Rejecting all selected:', selectedRequests);
    alert(`${selectedRequests?.length} demandes rejetées`);
    setSelectedRequests([]);
  };

  const handleClearSelection = () => {
    setSelectedRequests([]);
  };

  const handleExport = () => {
    console.log('Exporting leave data');
    alert('Export des données en cours...');
  };

  const filteredRequests = leaveRequests?.filter((request) => {
    if (filters?.search && !request?.employeeName?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.leaveType !== 'all' && request?.type !== filters?.leaveType) {
      return false;
    }
    if (filters?.status !== 'all' && request?.status !== filters?.status) {
      return false;
    }
    return true;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Header />
        <Breadcrumb />
        <QuickActionButton />

        <main className="main-content p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Gestion des Congés
              </h1>
              <p className="text-sm text-muted-foreground">
                Gérez les demandes de congés et suivez la disponibilité de l'équipe
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}>

                Exporter
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => alert('Nouvelle demande de congé')}>

                Nouvelle demande
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <div className="card-elevated p-4 mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Soldes de congés
                </h3>
                <div className="space-y-3">
                  {employees?.map((employee) =>
                    <LeaveBalanceCard
                      key={employee?.id}
                      employee={employee}
                      balances={employee?.balances} />

                  )}
                </div>
              </div>

              <div className="card-elevated p-4">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters} />

              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="mb-6">
                <CalendarView
                  leaveEvents={leaveEvents}
                  onDateSelect={setSelectedDate}
                  selectedDate={selectedDate} />

              </div>

              <div className="mb-6">
                <TeamAvailabilityHeatmap availabilityData={availabilityData} />
              </div>

              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-foreground">
                    Demandes en attente ({filteredRequests?.length})
                  </h3>
                  {selectedRequests?.length > 0 &&
                    <span className="text-sm text-muted-foreground">
                      {selectedRequests?.length} sélectionnée{selectedRequests?.length > 1 ? 's' : ''}
                    </span>
                  }
                </div>

                <div className="space-y-4">
                  {filteredRequests?.map((request) =>
                    <div key={request?.id} className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedRequests?.includes(request?.id)}
                        onChange={() => handleToggleSelection(request?.id)}
                        className="mt-4" />

                      <div className="flex-1">
                        <LeaveRequestCard
                          request={request}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onViewDetails={handleViewDetails} />

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-20">
                <LeaveDetailsPanel
                  request={selectedRequest}
                  onClose={() => setSelectedRequest(null)}
                  onApprove={handleApprove}
                  onReject={handleReject} />

              </div>
            </div>
          </div>
        </main>

        <BulkApprovalToolbar
          selectedCount={selectedRequests?.length}
          onApproveAll={handleApproveAll}
          onRejectAll={handleRejectAll}
          onClearSelection={handleClearSelection} />

      </div>
    </SidebarProvider>);

};

export default LeaveManagementSystemHR;