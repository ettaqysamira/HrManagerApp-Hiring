import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/Sidebar';
import Sidebar from '../../components/navigation/Sidebar';
import Header from '../../components/navigation/Header';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import QuickActionButton from '../../components/navigation/QuickActionButton';
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Plus, Search, MapPin, Calendar, Users } from 'lucide-react';
import JobOfferService from '../../services/jobOffer.service';
import CreateJobOfferModal from './components/CreateJobOfferModal';
import { useToast } from "../../components/ui/use-toast";

const JobOfferManagement = () => {
    const [jobOffers, setJobOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { toast } = useToast();

    const fetchJobOffers = async () => {
        try {
            setLoading(true);
            const data = await JobOfferService.getAll();
            setJobOffers(data);
        } catch (error) {
            console.error("Failed to fetch job offers:", error);
            toast({
                title: "Erreur",
                description: "Impossible de charger les offres d'emploi.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobOffers();
    }, []);

    const handleCreateSuccess = () => {
        fetchJobOffers();
        setShowCreateModal(false);
        toast({
            title: "Succès",
            description: "Offre d'emploi créée avec succès.",
        });
    };

    const filteredOffers = jobOffers.filter(offer =>
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background">
                <Sidebar />
                <Header />
                <Breadcrumb />
                <main className="main-content">
                    <div className="px-6 py-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-3xl font-semibold text-foreground mb-2">
                                    Gestion des Offres d'Emploi
                                </h1>
                                <p className="text-muted-foreground">
                                    Créez et gérez les offres d'emploi disponibles.
                                </p>
                            </div>
                            <Button onClick={() => setShowCreateModal(true)} className="bg-primary hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" /> Nouvelle Offre
                            </Button>
                        </div>

                        <div className="bg-card rounded-lg border shadow-sm p-4 mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    className="pl-10"
                                    placeholder="Rechercher une offre..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {loading ? (
                                <p>Chargement...</p>
                            ) : filteredOffers.length === 0 ? (
                                <p className="text-center text-muted-foreground py-10">Aucune offre trouvée.</p>
                            ) : (
                                filteredOffers.map((offer) => (
                                    <div key={offer.id} className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold text-foreground mb-2">{offer.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{offer.description}</p>
                                                <div className="flex gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        {offer.location}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        {new Date(offer.postedDate).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${offer.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                            {offer.status === 'Open' ? 'Ouverte' : 'Fermée'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Modifier</Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </main>
                <QuickActionButton />
                {showCreateModal && (
                    <CreateJobOfferModal
                        open={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={handleCreateSuccess}
                    />
                )}
            </div>
        </SidebarProvider>
    );
};

export default JobOfferManagement;
