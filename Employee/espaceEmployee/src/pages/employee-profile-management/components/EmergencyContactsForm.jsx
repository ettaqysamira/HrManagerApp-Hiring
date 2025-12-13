import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const EmergencyContactsForm = ({ initialData, onSave, onCancel }) => {
  const [contacts, setContacts] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const relationshipOptions = [
    { value: 'spouse', label: 'Conjoint(e)' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Frère/Sœur' },
    { value: 'child', label: 'Enfant' },
    { value: 'friend', label: 'Ami(e)' },
    { value: 'other', label: 'Autre' }
  ];

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = { ...updatedContacts?.[index], [field]: value };
    setContacts(updatedContacts);

    if (errors?.[`contact${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors?.[`contact${index}_${field}`];
      setErrors(newErrors);
    }
  };

  const addContact = () => {
    if (contacts?.length < 3) {
      setContacts([
        ...contacts,
        {
          id: Date.now(),
          name: '',
          relationship: '',
          phoneNumber: '',
          email: ''
        }
      ]);
    }
  };

  const removeContact = (index) => {
    if (contacts?.length > 1) {
      const updatedContacts = contacts?.filter((_, i) => i !== index);
      setContacts(updatedContacts);
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    return phoneRegex?.test(phone?.replace(/\s/g, ''));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    contacts?.forEach((contact, index) => {
      if (!contact?.name?.trim()) {
        newErrors[`contact${index}_name`] = 'Le nom est requis';
      }

      if (!contact?.relationship) {
        newErrors[`contact${index}_relationship`] = 'La relation est requise';
      }

      if (!contact?.phoneNumber?.trim()) {
        newErrors[`contact${index}_phoneNumber`] = 'Le téléphone est requis';
      } else if (!validatePhone(contact?.phoneNumber)) {
        newErrors[`contact${index}_phoneNumber`] = 'Format invalide';
      }

      if (contact?.email && !validateEmail(contact?.email)) {
        newErrors[`contact${index}_email`] = 'Format d\'email invalide';
      }
    });

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
      if (onSave) {
        onSave(contacts);
      }
    }, 1500);
  };

  const handleReset = () => {
    setContacts(initialData);
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {contacts?.map((contact, index) => (
        <div key={contact?.id} className="bg-muted/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground">
              Contact d'Urgence {index + 1}
            </h4>
            {contacts?.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => removeContact(index)}
              >
                Supprimer
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom Complet"
              type="text"
              value={contact?.name}
              onChange={(e) => handleContactChange(index, 'name', e?.target?.value)}
              error={errors?.[`contact${index}_name`]}
              required
            />

            <Select
              label="Relation"
              options={relationshipOptions}
              value={contact?.relationship}
              onChange={(value) => handleContactChange(index, 'relationship', value)}
              error={errors?.[`contact${index}_relationship`]}
              required
            />

            <Input
              label="Numéro de Téléphone"
              type="tel"
              value={contact?.phoneNumber}
              onChange={(e) => handleContactChange(index, 'phoneNumber', e?.target?.value)}
              error={errors?.[`contact${index}_phoneNumber`]}
              required
              placeholder="+33 6 12 34 56 78"
            />

            <Input
              label="Email (Optionnel)"
              type="email"
              value={contact?.email}
              onChange={(e) => handleContactChange(index, 'email', e?.target?.value)}
              error={errors?.[`contact${index}_email`]}
              placeholder="email@exemple.com"
            />
          </div>
        </div>
      ))}
      {contacts?.length < 3 && (
        <Button
          type="button"
          variant="outline"
          onClick={addContact}
          iconName="Plus"
          iconPosition="left"
        >
          Ajouter un Contact d'Urgence
        </Button>
      )}
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

export default EmergencyContactsForm;