import React, { useState } from 'react';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';

import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import LeaveRequestCard from './components/LeaveRequestCard';
import CalendarView from './components/CalendarView';
import LeaveDetailsPanel from './components/LeaveDetailsPanel';
import FilterPanel from './components/FilterPanel';
import BulkApprovalToolbar from './components/BulkApprovalToolbar';
import TeamAvailabilityHeatmap from './components/TeamAvailabilityHeatmap';

const LeaveManagementSystem = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    leaveType: 'all',
    status: 'pending',
    department: 'all',
    startDate: '',
    endDate: '',
    myRequestsOnly: false,
    showConflicts: false
  });

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


  const leaveRequests = [
  {
    id: 1,
    employeeName: 'Samira ETTAQY',
    employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
    employeeAvatarAlt: 'Professional headshot of woman with brown hair in business attire smiling at camera',
    department: 'Informatique',
    position: 'Développeuse Senior',
    type: 'vacation',
    typeLabel: 'Congés payés',
    status: 'pending',
    startDate: '15/12/2025',
    endDate: '22/12/2025',
    duration: 6,
    reason: 'Vacances de fin d\'année en famille. Retour prévu le 23 décembre pour finaliser les projets avant la fermeture annuelle.',
    submittedDate: '28/11/2025',
    attachments: [],
    approverComments: null
  },
  {
    id: 2,
    employeeName: 'Sawsan Hamzaoui',
    employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bfef8bd5-1763295388609.png",
    employeeAvatarAlt: 'Professional headshot of man with short dark hair wearing navy suit and tie',
    department: 'Finance',
    position: 'Analyste Financier',
    type: 'sick',
    typeLabel: 'Congé maladie',
    status: 'pending',
    startDate: '02/12/2025',
    endDate: '04/12/2025',
    duration: 3,
    reason: 'Consultation médicale et récupération suite à intervention chirurgicale mineure.',
    submittedDate: '29/11/2025',
    attachments: [
    { name: 'certificat_medical.pdf', size: '245 KB' }],

    approverComments: null
  },
  {
    id: 3,
    employeeName: 'Ali Tazi',
    employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5600450-1763294005133.png",
    employeeAvatarAlt: 'Professional headshot of woman with blonde hair in white blouse smiling warmly',
    department: 'Marketing',
    position: 'Chef de Projet',
    type: 'personal',
    typeLabel: 'Congé personnel',
    status: 'pending',
    startDate: '10/12/2025',
    endDate: '11/12/2025',
    duration: 2,
    reason: 'Déménagement personnel nécessitant deux jours pour finaliser l\'installation.',
    submittedDate: '27/11/2025',
    attachments: [],
    approverComments: null
  },
  {
    id: 4,
    employeeName: 'Rim Saber',
    employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_131559abc-1763295559412.png",
    employeeAvatarAlt: 'Professional headshot of man with glasses and brown hair in gray suit',
    department: 'Ventes',
    position: 'Responsable Commercial',
    type: 'vacation',
    typeLabel: 'Congés payés',
    status: 'approved',
    startDate: '01/12/2025',
    endDate: '05/12/2025',
    duration: 5,
    reason: 'Congés annuels planifiés pour voyage familial.',
    submittedDate: '15/11/2025',
    attachments: [],
    approverComments: 'Approuvé. Bon voyage !'
  },
  {
    id: 5,
    employeeName: 'Mohammed naji',
    employeeAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19b7f77ca-1763293657165.png",
    employeeAvatarAlt: 'Professional headshot of woman with curly dark hair in black blazer with confident expression',
    department: 'RH',
    position: 'Gestionnaire RH',
    type: 'parental',
    typeLabel: 'Congé parental',
    status: 'pending',
    startDate: '20/12/2025',
    endDate: '03/01/2026',
    duration: 10,
    reason: 'Congé parental pour s\'occuper de mon nouveau-né pendant les fêtes de fin d\'année.',
    submittedDate: '25/11/2025',
    attachments: [
    { name: 'acte_naissance.pdf', size: '512 KB' }],

    approverComments: null
  }];


  const leaveEvents = [
  { date: '2025-12-01', employeeName: 'Pierre Lefebvre', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-02', employeeName: 'Pierre Lefebvre', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-02', employeeName: 'Thomas Dubois', type: 'sick', color: '#EF4444' },
  { date: '2025-12-03', employeeName: 'Pierre Lefebvre', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-03', employeeName: 'Thomas Dubois', type: 'sick', color: '#EF4444' },
  { date: '2025-12-04', employeeName: 'Pierre Lefebvre', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-04', employeeName: 'Thomas Dubois', type: 'sick', color: '#EF4444' },
  { date: '2025-12-05', employeeName: 'Pierre Lefebvre', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-10', employeeName: 'Julie Bernard', type: 'personal', color: '#10B981' },
  { date: '2025-12-11', employeeName: 'Julie Bernard', type: 'personal', color: '#10B981' },
  { date: '2025-12-15', employeeName: 'Samira ETTAQY', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-16', employeeName: 'Samira ETTAQY', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-17', employeeName: 'Samira ETTAQY', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-18', employeeName: 'Samira ETTAQY', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-19', employeeName: 'Samira ETTAQY', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-22', employeeName: 'Samira ETTAQY', type: 'vacation', color: '#3B82F6' },
  { date: '2025-12-20', employeeName: 'Isabelle Moreau', type: 'parental', color: '#A855F7' },
  { date: '2025-12-23', employeeName: 'Isabelle Moreau', type: 'parental', color: '#A855F7' },
  { date: '2025-12-24', employeeName: 'Isabelle Moreau', type: 'parental', color: '#A855F7' }];


  const availabilityData = [
  { department: 'Informatique', available: 12, total: 15, percentage: 80 },
  { department: 'Finance', available: 8, total: 10, percentage: 80 },
  { department: 'RH', available: 5, total: 8, percentage: 62.5 },
  { department: 'Ventes', available: 18, total: 20, percentage: 90 },
  { department: 'Marketing', available: 9, total: 12, percentage: 75 }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      leaveType: 'all',
      status: 'pending',
      department: 'all',
      startDate: '',
      endDate: '',
      myRequestsOnly: false,
      showConflicts: false
    });
  };

  const handleApprove = (requestId) => {
    console.log('Approving request:', requestId);
    alert(`Demande ${requestId} approuvée avec succès`);
  };

  const handleReject = (requestId) => {
    console.log('Rejecting request:', requestId);
    alert(`Demande ${requestId} rejetée`);
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

export default LeaveManagementSystem;