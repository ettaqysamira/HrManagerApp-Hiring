import React, { useState, useEffect } from 'react';
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Textarea } from "../../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import TagInput from "../../../components/ui/TagInput";
import LanguageInput from "../../../components/ui/LanguageInput";
import JobOfferService from '../../../services/jobOffer.service';

const CreateJobOfferModal = ({ open, onClose, onSuccess, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        location: initialData?.location || '',
        description: initialData?.description || '',
        requirements: initialData?.requirements || '',
        minYearsExperience: initialData?.minYearsExperience || 0,
        requiredSkills: [],
        requiredEducation: [],
        requiredLanguages: [],
    });

    useEffect(() => {
        if (initialData) {
            const safeParse = (str) => {
                if (!str) return [];
                try {
                    return typeof str === 'string' ? JSON.parse(str) : str;
                } catch (e) {
                    return [];
                }
            };

            setFormData({
                title: initialData.title || '',
                location: initialData.location || '',
                description: initialData.description || '',
                requirements: initialData.requirements || '',
                minYearsExperience: initialData.minYearsExperience || 0,
                requiredSkills: safeParse(initialData.requiredSkills || initialData.RequiredSkills),
                requiredEducation: safeParse(initialData.requiredEducation || initialData.RequiredEducation),
                requiredLanguages: safeParse(initialData.requiredLanguages || initialData.RequiredLanguages),
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                requiredSkills: JSON.stringify(formData.requiredSkills),
                requiredEducation: JSON.stringify(formData.requiredEducation),
                requiredLanguages: JSON.stringify(formData.requiredLanguages),
                minYearsExperience: parseInt(formData.minYearsExperience) || 0,
            };

            if (initialData?.id) {
                await JobOfferService.update(initialData.id, { ...payload, id: initialData.id });
                onSuccess("Offre d'emploi modifiée avec succès.");
            } else {
                await JobOfferService.create(payload);
                onSuccess("Offre d'emploi créée avec succès.");
            }

            setFormData({
                title: '',
                description: '',
                requirements: '',
                location: '',
                requiredSkills: [],
                minYearsExperience: 0,
                requiredEducation: [],
                requiredLanguages: [],
            });
        } catch (error) {
            console.error("Error saving job offer:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Modifier l'offre d'emploi" : "Créer une nouvelle offre d'emploi"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="title">Titre du poste *</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="location">Lieu *</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label>Compétences Requises</Label>
                        <TagInput
                            tags={formData.requiredSkills}
                            onChange={(skills) => setFormData({ ...formData, requiredSkills: skills })}
                            placeholder="Ex: Java, React, SQL..."
                        />
                        <p className="text-xs text-gray-500">Ajoutez les compétences techniques requises</p>
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="minYearsExperience">Années d'Expérience Minimum</Label>
                        <Input
                            id="minYearsExperience"
                            name="minYearsExperience"
                            type="number"
                            min="0"
                            max="50"
                            value={formData.minYearsExperience}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label>Niveau d'Éducation Requis</Label>
                        <TagInput
                            tags={formData.requiredEducation}
                            onChange={(education) => setFormData({ ...formData, requiredEducation: education })}
                            placeholder="Ex: Bac+5, Master..."
                        />
                        <p className="text-xs text-gray-500">Ex: Bac, Bac+2, Bac+3, Bac+5, Master, Doctorat</p>
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label>Langues Requises</Label>
                        <LanguageInput
                            languages={formData.requiredLanguages}
                            onChange={(languages) => setFormData({ ...formData, requiredLanguages: languages })}
                        />
                        <p className="text-xs text-gray-500">Ajoutez les langues avec leur niveau de maîtrise</p>
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="requirements">Prérequis Additionnels (optionnel)</Label>
                        <Textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} rows={3} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
                        <Button type="submit">{initialData ? "Sauvegarder les modifications" : "Créer l'offre"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateJobOfferModal;

