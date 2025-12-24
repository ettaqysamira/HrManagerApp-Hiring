import React, { useState, useCallback, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import ToolbarActions from './components/ToolbarActions';
import EmployeeTable from './components/EmployeeTable';
import EmployeeDetailsPanel from './components/EmployeeDetailsPanel';
import QuickEditModal from './components/QuickEditModal';
import PaginationControls from './components/PaginationControls';
import { EmployeeForm } from './components/EmployeeForm';
import { employeeApi } from '../../services/api';
import { toast } from '../../hooks/use-toast';

const EmployeeManagement = () => {
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showQuickEdit, setShowQuickEdit] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    departments: [],
    statuses: [],
    locations: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await employeeApi.getEmployees();
      const mappedEmployees = response.data.map(emp => ({
        ...emp,
        id: emp.id,
        employeeId: emp.employeeId,
        name: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        position: emp.position,
        contractStatus: emp.contractType,
        manager: emp.manager,
        startDate: emp.startDate, 
        status: emp.status,
        email: emp.email,
        phone: emp.phone,
        birthDate: emp.birthDate,
        address: emp.address,
        salary: emp.salary,
        avatar: (emp.photoUrl || emp.PhotoUrl)
          ? ((emp.photoUrl || emp.PhotoUrl).startsWith('http') || (emp.photoUrl || emp.PhotoUrl).startsWith('data:')
            ? (emp.photoUrl || emp.PhotoUrl)
            : `http://localhost:5076/${emp.photoUrl || emp.PhotoUrl}`)
          : "https://github.com/shadcn.png"
      }));
      setEmployees(mappedEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des employés",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleFilterChange = useCallback((type, value, checked) => {
    if (type === 'reset') {
      setFilters({ departments: [], statuses: [], locations: [] });
      return;
    }

    if (type === 'savedSearch') {
      console.log('Applying saved search:', value);
      return;
    }

    setFilters((prev) => {
      const key = type === 'department' ? 'departments' : type === 'status' ? 'statuses' : 'locations';
      const current = prev?.[key] || [];

      if (checked) {
        return { ...prev, [key]: [...current, value] };
      } else {
        return { ...prev, [key]: current?.filter((item) => item !== value) };
      }
    });
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleSelectEmployee = useCallback((id) => {
    setSelectedEmployees((prev) =>
      prev?.includes(id) ? prev?.filter((empId) => empId !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedEmployees?.length === employees?.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees?.map((emp) => emp?.id));
    }
  }, [selectedEmployees?.length, employees]);

  const handleEmployeeClick = useCallback((employee) => {
    setSelectedEmployee(employee);
  }, []);

  const handleQuickEdit = useCallback((employee) => {
    setEditingEmployee(employee);
    setShowQuickEdit(true);
  }, []);

  const handleSaveQuickEdit = useCallback(async (updatedEmployee) => {
    try {
      await employeeApi.updateEmployee(updatedEmployee.id, updatedEmployee);
      toast({
        title: "Succès",
        description: "Employé mis à jour avec succès",
      });
      setShowQuickEdit(false);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'employé",
        variant: "destructive"
      });
    }
  }, [fetchEmployees]);

  const handleDelete = useCallback(async (employee) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      try {
        await employeeApi.deleteEmployee(employee.id);
        toast({
          title: "Succès",
          description: "Employé supprimé avec succès",
        });
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'employé",
          variant: "destructive"
        });
      }
    }
  }, [fetchEmployees]);

  const handleBulkAction = useCallback((action) => {
    console.log('Bulk action:', action, 'for employees:', selectedEmployees);
  }, [selectedEmployees]);

  const handleExport = useCallback((format) => {
    console.log('Exporting in format:', format);
  }, []);

  const handleAddEmployee = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId?.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Header />

        <main className={`main-content ${isFilterCollapsed ? '' : 'sidebar-collapsed'}`}>
          <Breadcrumb />
          {/*
        <FilterSidebar
            isCollapsed={isFilterCollapsed}
            onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
            filters={filters}
            onFilterChange={handleFilterChange} />
        */}



          <div className={`transition-all duration-200 ${isFilterCollapsed ? 'ml-0' : 'ml-80'} ${selectedEmployee ? 'mr-96' : 'mr-0'}`}>
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-foreground mb-2">Gestion des Employés</h1>
                <p className="text-sm text-muted-foreground">
                  Gérez et suivez tous les employés de votre organisation
                </p>
              </div>

              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <SearchBar
                  onSearch={handleSearch}
                  onFilterToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
                  isFilterVisible={!isFilterCollapsed} />


                <ToolbarActions
                  selectedCount={selectedEmployees?.length}
                  onBulkAction={handleBulkAction}
                  onExport={handleExport}
                  onAddEmployee={handleAddEmployee} />


                <div className="p-4">
                  {isLoading ? (
                    <div className="flex justify-center p-8">Chargement...</div>
                  ) : (
                    <EmployeeTable
                      employees={paginatedEmployees}
                      selectedEmployees={selectedEmployees}
                      onSelectEmployee={handleSelectEmployee}
                      onSelectAll={handleSelectAll}
                      onSort={handleSort}
                      sortConfig={sortConfig}
                      onEmployeeClick={handleEmployeeClick}
                      onQuickEdit={handleQuickEdit}
                      onDelete={handleDelete} />
                  )}

                </div>

                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages || 1}
                  pageSize={pageSize}
                  totalItems={employees?.length}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize} />

              </div>
            </div>
          </div>
          {/* <EmployeeDetailsPanel
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)} />*/}

          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <EmployeeForm
                  onClose={() => setShowAddModal(false)}
                  onSubmit={(newEmp) => {
                    fetchEmployees();
                    setShowAddModal(false);
                  }}
                />
              </div>
            </div>
          )}

          {showQuickEdit &&
            <QuickEditModal
              employee={editingEmployee}
              onClose={() => {
                setShowQuickEdit(false);
                setEditingEmployee(null);
              }}
              onSave={handleSaveQuickEdit} />

          }

          <QuickActionButton />
        </main>
      </div>
    </SidebarProvider>);

};

export default EmployeeManagement;