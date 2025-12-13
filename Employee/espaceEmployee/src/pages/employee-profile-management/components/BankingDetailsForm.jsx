import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BankingDetailsForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [modifiedFields, setModifiedFields] = useState(new Set());
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setModifiedFields(prev => new Set([...prev, field]));
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateIBAN = (iban) => {
    const ibanRegex = /^FR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{3}$/;
    return ibanRegex?.test(iban?.replace(/\s/g, ''));
  };

  const validateBIC = (bic) => {
    const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    return bicRegex?.test(bic);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.bankName?.trim()) {
      newErrors.bankName = 'Le nom de la banque est requis';
    }

    if (!formData?.accountHolderName?.trim()) {
      newErrors.accountHolderName = 'Le nom du titulaire est requis';
    }

    if (!formData?.iban?.trim()) {
      newErrors.iban = 'L\'IBAN est requis';
    } else if (!validateIBAN(formData?.iban)) {
      newErrors.iban = 'Format IBAN invalide (ex: FR76 1234 5678 9012 3456 7890 123)';
    }

    if (!formData?.bic?.trim()) {
      newErrors.bic = 'Le BIC/SWIFT est requis';
    } else if (!validateBIC(formData?.bic)) {
      newErrors.bic = 'Format BIC invalide (ex: BNPAFRPP)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setModifiedFields(new Set());
      if (onSave) {
        onSave(formData);
      }
    }, 1500);
  };

  const handleReset = () => {
    setFormData(initialData);
    setModifiedFields(new Set());
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  const maskIBAN = (iban) => {
    if (!iban) return '';
    const cleaned = iban?.replace(/\s/g, '');
    return `${cleaned?.slice(0, 4)} **** **** **** **** **** ${cleaned?.slice(-3)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
        <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
        <div>
          <p className="text-sm font-medium text-warning">Informations Sensibles</p>
          <p className="text-xs text-muted-foreground mt-1">
            Ces informations sont cryptées et utilisées uniquement pour le traitement de la paie.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Détails Bancaires</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconName={showSensitiveData ? 'EyeOff' : 'Eye'}
          iconPosition="left"
          onClick={() => setShowSensitiveData(!showSensitiveData)}
        >
          {showSensitiveData ? 'Masquer' : 'Afficher'}
        </Button>
      </div>
      <div className="space-y-6">
        <Input
          label="Nom de la Banque"
          type="text"
          value={formData?.bankName}
          onChange={(e) => handleChange('bankName', e?.target?.value)}
          error={errors?.bankName}
          required
          className={modifiedFields?.has('bankName') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Nom du Titulaire du Compte"
          type="text"
          value={formData?.accountHolderName}
          onChange={(e) => handleChange('accountHolderName', e?.target?.value)}
          error={errors?.accountHolderName}
          required
          description="Doit correspondre au nom sur votre compte bancaire"
          className={modifiedFields?.has('accountHolderName') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="IBAN"
          type="text"
          value={showSensitiveData ? formData?.iban : maskIBAN(formData?.iban)}
          onChange={(e) => handleChange('iban', e?.target?.value)}
          error={errors?.iban}
          required
          placeholder="FR76 1234 5678 9012 3456 7890 123"
          disabled={!showSensitiveData}
          className={modifiedFields?.has('iban') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="BIC/SWIFT"
          type="text"
          value={formData?.bic}
          onChange={(e) => handleChange('bic', e?.target?.value?.toUpperCase())}
          error={errors?.bic}
          required
          placeholder="BNPAFRPP"
          maxLength={11}
          className={modifiedFields?.has('bic') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Adresse de la Banque"
          type="text"
          value={formData?.bankAddress}
          onChange={(e) => handleChange('bankAddress', e?.target?.value)}
          error={errors?.bankAddress}
          className={modifiedFields?.has('bankAddress') ? 'ring-2 ring-accent/20' : ''}
        />
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button
          type="submit"
          variant="default"
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Enregistrer les Modifications
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isSaving}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default BankingDetailsForm;