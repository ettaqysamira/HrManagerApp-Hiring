import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LeaveRequestModal = ({ isOpen, onClose, onSubmit, leaveBalances }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    halfDay: false
  });

  const [errors, setErrors] = useState({});
  const [conflicts, setConflicts] = useState([]);

  if (!isOpen) return null;

  const leaveTypeOptions = [
    { value: 'conges_payes', label: 'Congés Payés' },
    { value: 'conges_maladie', label: 'Congés Maladie' },
    { value: 'conges_sans_solde', label: 'Congés Sans Solde' },
    { value: 'conges_recuperation', label: 'Récupération' },
    { value: 'conges_formation', label: 'Congés Formation' }
  ];

  const calculateDuration = () => {
    if (!formData?.startDate || !formData?.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return formData?.halfDay ? diffDays * 0.5 : diffDays;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.leaveType) {
      newErrors.leaveType = 'Type de congé requis';
    }

    if (!formData?.startDate) {
      newErrors.startDate = 'Date de début requise';
    }

    if (!formData?.endDate) {
      newErrors.endDate = 'Date de fin requise';
    }

    if (formData?.startDate && formData?.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        newErrors.endDate = 'La date de fin doit être après la date de début';
      }
    }

    if (!formData?.reason || formData?.reason?.trim()?.length < 10) {
      newErrors.reason = 'Le motif doit contenir au moins 10 caractères';
    }

    const duration = calculateDuration();
    const selectedLeaveType = leaveBalances?.find(lb => lb?.type?.toLowerCase()?.includes(formData?.leaveType?.split('_')?.[1]));
    /*
    if (selectedLeaveType && duration > selectedLeaveType?.balance) {
      newErrors.balance = `Solde insuffisant. Disponible: ${selectedLeaveType?.balance} jours`;
    }
    */

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (validateForm()) {
      const duration = calculateDuration();
      onSubmit({
        ...formData,
        duration,
        submittedDate: new Date()?.toISOString(),
        status: 'En attente'
      });

      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        halfDay: false
      });
      setErrors({});
      setConflicts([]);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const duration = calculateDuration();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="CalendarPlus" size={20} color="white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Nouvelle Demande de Congé</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Fermer"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Select
            label="Type de Congé"
            description="Sélectionnez le type de congé souhaité"
            required
            options={leaveTypeOptions}
            value={formData?.leaveType}
            onChange={(value) => handleChange('leaveType', value)}
            error={errors?.leaveType}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date de Début"
              type="date"
              required
              value={formData?.startDate}
              onChange={(e) => handleChange('startDate', e?.target?.value)}
              error={errors?.startDate}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />

            <Input
              label="Date de Fin"
              type="date"
              required
              value={formData?.endDate}
              onChange={(e) => handleChange('endDate', e?.target?.value)}
              error={errors?.endDate}
              min={formData?.startDate || new Date()?.toISOString()?.split('T')?.[0]}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="halfDay"
              checked={formData?.halfDay}
              onChange={(e) => handleChange('halfDay', e?.target?.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="halfDay" className="text-sm text-foreground">
              Demi-journée
            </label>
          </div>

          {duration > 0 && (
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center gap-2 text-accent">
                <Icon name="Info" size={16} />
                <span className="text-sm font-medium">
                  Durée totale: {duration} jour{duration > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}

          {errors?.balance && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center gap-2 text-error">
                <Icon name="AlertCircle" size={16} />
                <span className="text-sm font-medium">{errors?.balance}</span>
              </div>
            </div>
          )}

          {conflicts?.length > 0 && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-2 text-warning mb-2">
                <Icon name="AlertTriangle" size={16} className="mt-0.5" />
                <span className="text-sm font-medium">Conflits détectés:</span>
              </div>
              <ul className="ml-6 space-y-1">
                {conflicts?.map((conflict, index) => (
                  <li key={index} className="text-xs text-muted-foreground">• {conflict}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-error">*</span>
            </label>
            <textarea
              value={formData?.reason}
              onChange={(e) => handleChange('reason', e?.target?.value)}
              placeholder="Décrivez le motif de votre demande de congé..."
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none
                ${errors?.reason ? 'border-error' : 'border-border'}`}
            />
            {errors?.reason && (
              <p className="mt-1 text-xs text-error">{errors?.reason}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {formData?.reason?.length} / 500 caractères
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Send"
              iconPosition="right"
              className="flex-1"
            >
              Soumettre la Demande
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestModal;