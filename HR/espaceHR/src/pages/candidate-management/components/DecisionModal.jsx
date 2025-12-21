import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import Button from "../../../components/ui/Button";
import { Label } from "../../../components/ui/Label";
import Input from "../../../components/ui/Input";

const DecisionModal = ({ open, onClose, candidate, onConfirm, type }) => {
    const [interviewDate, setInterviewDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(type === 'accept' ? interviewDate : null);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {type === 'accept' ? 'Accepter la candidature' : 'Refuser la candidature'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                        {type === 'accept'
                            ? `Vous allez accepter la candidature de ${candidate?.name}. Veuillez fixer une date d'entretien.`
                            : `Voulez-vous vraiment refuser la candidature de ${candidate?.name} ? Un e-mail de refus lui sera envoyé.`}
                    </p>

                    {type === 'accept' && (
                        <div className="space-y-2">
                            <Label htmlFor="date">Date et heure de l'entretien</Label>
                            <Input
                                id="date"
                                type="datetime-local"
                                value={interviewDate}
                                onChange={(e) => setInterviewDate(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant={type === 'accept' ? 'default' : 'destructive'}
                        >
                            {type === 'accept' ? 'Confirmer et Envoyer' : 'Confirmer le refus'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DecisionModal;
