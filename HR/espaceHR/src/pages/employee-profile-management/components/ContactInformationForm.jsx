import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContactInformationForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [modifiedFields, setModifiedFields] = useState(new Set());

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setModifiedFields(prev => new Set([...prev, field]));

    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    return phoneRegex?.test(phone?.replace(/\s/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.personalEmail?.trim()) {
      newErrors.personalEmail = 'L\'email personnel est requis';
    } else if (!validateEmail(formData?.personalEmail)) {
      newErrors.personalEmail = 'Format d\'email invalide';
    }

    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Le numéro de téléphone est requis';
    } else if (!validatePhone(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Format de téléphone invalide (ex: +33612345678)';
    }

    if (formData?.mobileNumber && !validatePhone(formData?.mobileNumber)) {
      newErrors.mobileNumber = 'Format de téléphone invalide';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData?.postalCode?.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    } else if (!/^\d{5}$/?.test(formData?.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    }

    if (!formData?.country?.trim()) {
      newErrors.country = 'Le pays est requis';
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
    setIsSaving(true);
    if (onSave) {
      onSave(formData).finally(() => {
        setIsSaving(false);
        setModifiedFields(new Set());
      });
    } else {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setModifiedFields(new Set());
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Personnel"
          type="email"
          value={formData?.personalEmail}
          onChange={(e) => handleChange('personalEmail', e?.target?.value)}
          error={errors?.personalEmail}
          required
          description="Utilisé pour les communications importantes"
          className={modifiedFields?.has('personalEmail') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Email Professionnel"
          type="email"
          value={formData?.workEmail}
          disabled
          description="Géré par le département IT"
        />

        <Input
          label="Téléphone Principal"
          type="tel"
          value={formData?.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e?.target?.value)}
          error={errors?.phoneNumber}
          required
          placeholder="+33 6 12 34 56 78"
          className={modifiedFields?.has('phoneNumber') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Téléphone Mobile"
          type="tel"
          value={formData?.mobileNumber}
          onChange={(e) => handleChange('mobileNumber', e?.target?.value)}
          error={errors?.mobileNumber}
          placeholder="+33 6 12 34 56 78"
          className={modifiedFields?.has('mobileNumber') ? 'ring-2 ring-accent/20' : ''}
        />
      </div>
      <div className="space-y-6">
        <Input
          label="Adresse"
          type="text"
          value={formData?.address}
          onChange={(e) => handleChange('address', e?.target?.value)}
          error={errors?.address}
          required
          placeholder="Numéro et nom de rue"
          className={modifiedFields?.has('address') ? 'ring-2 ring-accent/20' : ''}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Ville"
            type="text"
            value={formData?.city}
            onChange={(e) => handleChange('city', e?.target?.value)}
            error={errors?.city}
            required
            className={modifiedFields?.has('city') ? 'ring-2 ring-accent/20' : ''}
          />

          <Input
            label="Code Postal"
            type="text"
            value={formData?.postalCode}
            onChange={(e) => handleChange('postalCode', e?.target?.value)}
            error={errors?.postalCode}
            required
            placeholder="75001"
            maxLength={5}
            className={modifiedFields?.has('postalCode') ? 'ring-2 ring-accent/20' : ''}
          />

          <Input
            label="Pays"
            type="text"
            value={formData?.country}
            onChange={(e) => handleChange('country', e?.target?.value)}
            error={errors?.country}
            required
            className={modifiedFields?.has('country') ? 'ring-2 ring-accent/20' : ''}
          />
        </div>
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

export default ContactInformationForm;