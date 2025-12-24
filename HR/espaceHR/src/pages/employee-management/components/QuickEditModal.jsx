import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickEditModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    position: employee?.position || '',
    department: employee?.department || '',
    status: employee?.status || '',
    manager: employee?.manager || '',
    login: employee?.login || employee?.Login || '',
    password: employee?.password || employee?.Password || ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const departmentOptions = [
    { value: 'IT', label: 'Technologie' },
    { value: 'RH', label: 'Ressources Humaines' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Commercial', label: 'Ventes' }
  ];

  const statusOptions = [
    { value: 'Actif', label: 'Actif' },
    { value: 'En Congé', label: 'En Congé' },
    { value: 'Période d\'Essai', label: 'Période d\'Essai' },
    { value: 'Inactif', label: 'Inactif' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    const updatedUser = {
      ...employee,
      ...formData,
      department: formData.department,
      status: formData.status,
      Department: formData.department,
      Status: formData.status,
      Login: formData.login,
      Password: formData.password
    };
    onSave(updatedUser);
  };

  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-2 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Modification Rapide</h2>
            <p className="text-sm text-muted-foreground mt-1">{employee?.name} • {employee?.employeeId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label="Fermer"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Poste"
                type="text"
                value={formData?.position}
                onChange={(e) => setFormData({ ...formData, position: e?.target?.value })}
                required
              />
              <Select
                label="Département"
                options={departmentOptions}
                value={formData?.department}
                onChange={(value) => setFormData({ ...formData, department: value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Statut"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => setFormData({ ...formData, status: value })}
                required
              />
              <Input
                label="Manager"
                type="text"
                value={formData?.manager}
                onChange={(e) => setFormData({ ...formData, manager: e?.target?.value })}
                required
              />
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Key" size={18} color="var(--color-primary)" />
                <h3 className="text-sm font-semibold text-foreground">Identifiants de Connexion</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Identifiant"
                  type="text"
                  value={formData?.login}
                  onChange={(e) => setFormData({ ...formData, login: e?.target?.value })}
                  required
                  icon="User"
                />
                <div className="relative">
                  <Input
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    value={formData?.password}
                    onChange={(e) => setFormData({ ...formData, password: e?.target?.value })}
                    required
                    icon="Lock"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] p-1 rounded hover:bg-accent/10 transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    <Icon
                      name={showPassword ? 'EyeOff' : 'Eye'}
                      size={16}
                      color="var(--color-muted-foreground)"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning mb-1">Modification Rapide</p>

              </div>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="default" onClick={handleSubmit} iconName="Save" iconPosition="left">
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickEditModal;