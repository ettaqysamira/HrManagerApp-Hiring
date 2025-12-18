import React, { useState } from 'react';
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Label } from "../../../components/ui/Label";
import { Textarea } from "../../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../../components/ui/dialog";
import CandidateService from '../../../services/candidate.service';

const ApplyModal = ({ open, onClose, offer, onSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        skills: '', 
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile) {
            alert("Veuillez télécharger votre CV.");
            return;
        }

        try {
            setSubmitting(true);
            const data = new FormData();
            data.append('FullName', formData.fullName);
            data.append('Email', formData.email);
            data.append('Phone', formData.phone);
            data.append('Skills', formData.skills);
            data.append('JobOfferId', offer.id);
            data.append('Resume', resumeFile);

            await CandidateService.apply(data);
            onSuccess();
        } catch (error) {
            console.error("Error applying:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Postuler pour {offer.title}</DialogTitle>
                    <DialogDescription>
                        Remplissez le formulaire ci-dessous pour soumettre votre candidature.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="fullName">Nom complet</Label>
                        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="skills">Compétences (séparées par des virgules)</Label>
                        <Input id="skills" name="skills" placeholder="Java, React, SQL..." value={formData.skills} onChange={handleChange} />
                        <p className="text-xs text-muted-foreground">Ces mots-clés aideront les recruteurs à vous trouver.</p>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="resume">CV (PDF, Word)</Label>
                        <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
                        <Button type="submit" disabled={submitting}>{submitting ? 'Envoi...' : 'Postuler'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ApplyModal;
