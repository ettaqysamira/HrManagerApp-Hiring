import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import { useSidebar } from '../../components/navigation/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContractStatusCard from './components/ContractStatusCard';
import ContractDocumentView from './components/ContractDocumentView'; 
import { contractApi, employeeApi } from '../../services/api';
import { toast } from '../../hooks/use-toast';
import { Card, CardContent } from '../../components/ui/card';
import Input from '../../components/ui/Input';

const ContractAdministrationContent = () => {
  const { isCollapsed } = useSidebar();
  const [selectedContract, setSelectedContract] = useState(null); 
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    employeeId: '',
    type: 'CDI',
    startDate: '',
    endDate: '',
    salary: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchContracts();
    fetchEmployees();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await contractApi.getContracts();
      setContracts(response.data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
      toast({ title: "Erreur", description: "Impossible de charger les contrats", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await employeeApi.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };


  const handleOpenCreate = () => {
    setFormData({ id: null, employeeId: '', type: 'CDI', startDate: '', endDate: '', salary: '', status: 'Active' });
    setIsEditing(false);
    setShowCreateModal(true);
  };

  const handleOpenEdit = (contract) => {
    setFormData({
      id: contract.id,
      employeeId: contract.employeeId,
      type: contract.type,
      startDate: contract.startDate.split('T')[0],
      endDate: contract.endDate ? contract.endDate.split('T')[0] : '',
      salary: contract.salary,
      status: contract.status
    });
    setIsEditing(true);
    setShowCreateModal(true);
  };

  const handleSaveContract = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        id: isEditing ? formData.id : 0,
        employeeId: parseInt(formData.employeeId),
        salary: parseFloat(formData.salary),
        endDate: formData.endDate ? formData.endDate : null
      };

      if (isEditing) {
        await contractApi.updateContract(formData.id, payload);
        toast({ title: "Succès", description: "Contrat mis à jour" });
      } else {
        await contractApi.createContract(payload);
        toast({ title: "Succès", description: "Contrat créé" });
      }

      setShowCreateModal(false);
      fetchContracts();
    } catch (error) {
      console.error("Error saving contract:", error);
      toast({ title: "Erreur", description: "Erreur lors de l'enregistrement", variant: "destructive" });
    }
  };

  const handleDeleteContract = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce contrat ?")) return;

    try {
      await contractApi.deleteContract(id);
      toast({ title: "Succès", description: "Contrat supprimé" });
      fetchContracts();
    } catch (error) {
      console.error("Error deleting contract:", error);
      toast({ title: "Erreur", description: "Impossible de supprimer le contrat", variant: "destructive" });
    }
  };

  const handleViewDocument = (contract) => {
    setSelectedContract(contract);
    setShowViewModal(true);
  };

  const stats = {
    active: contracts.filter(c => c.status === 'Active').length,
    expiring: contracts.filter(c => {
      if (!c.endDate) return false;
      const diff = new Date(c.endDate) - new Date();
      const days = diff / (1000 * 60 * 60 * 24);
      return days > 0 && days < 30;
    }).length,
    terminated: contracts.filter(c => c.status === 'Terminated' || c.status === 'Expired').length
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
                Gestion des contrats de travail
              </p>
            </div>
            <Button variant="default" iconName="Plus" onClick={handleOpenCreate}>
              Nouveau Contrat
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ContractStatusCard title="Contrats Actifs" count={stats.active} icon="FileCheck" />
            <ContractStatusCard title="Expire bientôt (<30j)" count={stats.expiring} icon="AlertCircle" />
            <ContractStatusCard title="Terminés/Expirés" count={stats.terminated} icon="XCircle" />
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">Employé</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Date Début</th>
                      <th className="px-6 py-3">Date Fin</th>
                      <th className="px-6 py-3">Salaire</th>
                      <th className="px-6 py-3">Statut</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (
                      <tr><td colSpan="7" className="p-4 text-center">Chargement...</td></tr>
                    ) : contracts.map((contract) => (
                      <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 font-medium">
                          {contract.employee ? `${contract.employee.firstName} ${contract.employee.lastName}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4">{contract.type}</td>
                        <td className="px-6 py-4">{new Date(contract.startDate).toLocaleDateString('fr-FR')}</td>
                        <td className="px-6 py-4">
                          {contract.endDate ? new Date(contract.endDate).toLocaleDateString('fr-FR') : 'Indéterminée'}
                        </td>
                        <td className="px-6 py-4">{contract.salary} MAD</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {contract.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" iconName="Eye" onClick={() => handleViewDocument(contract)} title="Voir le document" />
                            <Button variant="ghost" size="sm" iconName="Edit" onClick={() => handleOpenEdit(contract)} title="Modifier" />
                            <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => handleDeleteContract(contract.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50" title="Supprimer" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modifier le Contrat' : 'Nouveau Contrat'}</h2>
            <form onSubmit={handleSaveContract} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Employé</label>
                <select
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 py-2"
                  value={formData.employeeId}
                  onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                  disabled={isEditing}
                >
                  <option value="">Sélectionner un employé</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 py-2"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Anapec">Anapec</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Salaire (MAD)</label>
                  <Input
                    type="number"
                    value={formData.salary}
                    onChange={e => setFormData({ ...formData, salary: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date Début</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date Fin</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Statut</label>
                <select
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-background px-3 py-2"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Actif</option>
                  <option value="Expired">Expiré</option>
                  <option value="Terminated">Terminé</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setShowCreateModal(false)} type="button">Annuler</Button>
                <Button variant="default" type="submit">{isEditing ? 'Enregistrer' : 'Créer'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedContract && (
        <ContractDocumentView
          contract={selectedContract}
          onClose={() => setShowViewModal(false)}
        />
      )}

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
