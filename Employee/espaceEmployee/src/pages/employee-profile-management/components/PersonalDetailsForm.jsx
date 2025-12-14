import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalDetailsForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [modifiedFields, setModifiedFields] = useState(new Set());

  const genderOptions = [
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' },
    { value: 'other', label: 'Autre' }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: 'Célibataire' },
    { value: 'married', label: 'Marié(e)' },
    { value: 'divorced', label: 'Divorcé(e)' },
    { value: 'widowed', label: 'Veuf/Veuve' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setModifiedFields(prev => new Set([...prev, field]));

    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = 'La date de naissance est requise';
    }

    if (!formData?.placeOfBirth?.trim()) {
      newErrors.placeOfBirth = 'Le lieu de naissance est requis';
    }

    if (!formData?.nationality?.trim()) {
      newErrors.nationality = 'La nationalité est requise';
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
      // Pass a callback or handle promise to stop saving state
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
          label="Prénom"
          type="text"
          value={formData?.firstName}
          onChange={(e) => handleChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
          className={modifiedFields?.has('firstName') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Nom"
          type="text"
          value={formData?.lastName}
          onChange={(e) => handleChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
          className={modifiedFields?.has('lastName') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Date de Naissance"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
          className={modifiedFields?.has('dateOfBirth') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Lieu de Naissance"
          type="text"
          value={formData?.placeOfBirth}
          onChange={(e) => handleChange('placeOfBirth', e?.target?.value)}
          error={errors?.placeOfBirth}
          required
          className={modifiedFields?.has('placeOfBirth') ? 'ring-2 ring-accent/20' : ''}
        />

        <Select
          label="Genre"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleChange('gender', value)}
          error={errors?.gender}
          required
          className={modifiedFields?.has('gender') ? 'ring-2 ring-accent/20' : ''}
        />

        <Select
          label="Statut Marital"
          options={maritalStatusOptions}
          value={formData?.maritalStatus}
          onChange={(value) => handleChange('maritalStatus', value)}
          error={errors?.maritalStatus}
          className={modifiedFields?.has('maritalStatus') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Nationalité"
          type="text"
          value={formData?.nationality}
          onChange={(e) => handleChange('nationality', e?.target?.value)}
          error={errors?.nationality}
          required
          className={modifiedFields?.has('nationality') ? 'ring-2 ring-accent/20' : ''}
        />

        <Input
          label="Numéro de Sécurité Sociale"
          type="text"
          value={formData?.socialSecurityNumber}
          onChange={(e) => handleChange('socialSecurityNumber', e?.target?.value)}
          error={errors?.socialSecurityNumber}
          className={modifiedFields?.has('socialSecurityNumber') ? 'ring-2 ring-accent/20' : ''}
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

export default PersonalDetailsForm;