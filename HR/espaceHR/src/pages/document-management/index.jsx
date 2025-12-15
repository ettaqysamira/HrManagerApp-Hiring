import React from 'react';
import { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';

const DocumentManagement = () => {
    const currentUser = {
        name: "Employé",
        role: "Collaborateur",
        email: "employe@example.com"
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background">
                <SidebarNavigation />
                <MobileNavigationMenu />
                <TopBar currentUser={currentUser} />
                <main className="main-content">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Gestion des Documents</h1>
                        <p className="text-muted-foreground">Module en cours de développement.</p>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default DocumentManagement;
