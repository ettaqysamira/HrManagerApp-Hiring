import React, { useState, useEffect } from 'react';
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Search, MapPin, Calendar, Briefcase } from 'lucide-react';
import JobOfferService from '../../services/jobOffer.service';
import ApplyModal from './components/ApplyModal';
import { useToast } from "../../components/ui/use-toast";
import Header from '../../components/navigation/Header'; 

const Careers = () => {
    const [jobOffers, setJobOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true);
                const responseData = await JobOfferService.getAll();
                const data = Array.isArray(responseData) ? responseData : (responseData?.value || responseData?.data || []);

                setJobOffers(data.filter(offer => {
                    const status = (offer.status || offer.Status || '').toLowerCase();
                    return ['open', 'ouverte', 'ouvert'].includes(status);
                }));
            } catch (error) {
                console.error("Failed to fetch job offers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const handleApply = (offer) => {
        setSelectedOffer(offer);
        setShowApplyModal(true);
    };

    const handleApplySuccess = () => {
        setShowApplyModal(false);
        toast({
            title: "Candidature envoyée!",
            description: "Votre candidature a été soumise avec succès.",
        });
    };

    const filteredOffers = jobOffers.filter(offer =>
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Simple Public Header */}
            <header className="border-b bg-card">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">Carrières</span>
                    </div>
                    <Button onClick={() => window.location.href = '/auth'}>Connexion Employé/RH</Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Rejoignez notre équipe</h1>
                    <p className="text-xl text-muted-foreground">Découvrez nos opportunités et construisez votre avenir avec nous.</p>
                </div>

                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            className="pl-10 py-6 text-lg"
                            placeholder="Rechercher un poste..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-6 max-w-4xl mx-auto">
                    {loading ? (
                        <p className="text-center">Chargement des offres...</p>
                    ) : filteredOffers.length === 0 ? (
                        <p className="text-center text-muted-foreground">Aucune offre correspondant à votre recherche.</p>
                    ) : (
                        filteredOffers.map((offer) => (
                            <div key={offer.id} className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold mb-2">{offer.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {offer.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                Publié le {new Date(offer.postedDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground mb-4 line-clamp-3">{offer.description}</p>
                                        <div className="flex gap-2">
                                            {offer.requirements && (
                                                <div className="text-sm bg-secondary/50 px-3 py-1 rounded-full">
                                                    {offer.requirements.substring(0, 50)}...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Button size="lg" onClick={() => handleApply(offer)}>Postuler</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {showApplyModal && selectedOffer && (
                <ApplyModal
                    open={showApplyModal}
                    onClose={() => setShowApplyModal(false)}
                    offer={selectedOffer}
                    onSuccess={handleApplySuccess}
                />
            )}
        </div>
    );
};

export default Careers;
