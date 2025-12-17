import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import { contractApi } from '../../services/api';
import { authService as AuthService } from '../../services/auth.service';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import Icon from '../../components/AppIcon';

const DocumentManagement = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user);

        fetchMyContracts();
    }, []);

    const fetchMyContracts = async () => {
        try {
            const response = await contractApi.getMyContracts();
            setContracts(response.data);
        } catch (error) {
            console.error("Error fetching my contracts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (contractId) => {
        // Placeholder for PDF download
        alert(`Téléchargement du contrat #${contractId} (Fonctionnalité à venir)`);
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
                <SidebarNavigation />
                <MobileNavigationMenu />
                <TopBar currentUser={currentUser || { name: "Employé" }} />

                <main className="main-content">
                    <div className="p-6 max-w-5xl mx-auto space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mes Documents</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Consultez vos contrats et documents administratifs.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                <p>Chargement des documents...</p>
                            ) : contracts.length === 0 ? (
                                <Card className="col-span-full py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Icon name="FileText" size={48} className="opacity-20" />
                                        <p>Aucun document disponible pour le moment.</p>
                                    </div>
                                </Card>
                            ) : (
                                contracts.map((contract) => (
                                    <Card key={contract.id} className="hover:shadow-lg transition-shadow duration-200 border-none shadow-md">
                                        <CardHeader className="bg-primary/5 pb-4">
                                            <div className="flex justify-between items-start">
                                                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-primary">
                                                    <Icon name="FileText" size={24} />
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${contract.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {contract.status}
                                                </span>
                                            </div>
                                            <CardTitle className="mt-4 text-xl">Contrat {contract.type}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-4">
                                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                                <div className="flex justify-between">
                                                    <span>Début:</span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {new Date(contract.startDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Fin:</span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Indéterminée'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Salaire:</span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">{contract.salary} MAD</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDownload(contract.id)}
                                                className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
                                            >
                                                <Icon name="Download" size={18} />
                                                Télécharger PDF
                                            </button>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default DocumentManagement;
