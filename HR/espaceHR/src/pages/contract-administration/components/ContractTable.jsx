import React from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';

const ContractTable = ({ contracts, selectedContracts, onSelectContract, onSelectAll, onViewDetails }) => {
  const getUrgencyColor = (daysUntilExpiration) => {
    if (daysUntilExpiration <= 30) return 'text-error';
    if (daysUntilExpiration <= 60) return 'text-warning';
    return 'text-success';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Actif', color: 'bg-success/10 text-success' },
      expiring: { label: 'Expire bientôt', color: 'bg-warning/10 text-warning' },
      pending: { label: 'En attente', color: 'bg-accent/10 text-accent' },
      expired: { label: 'Expiré', color: 'bg-error/10 text-error' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-12">
                <Checkbox
                  checked={selectedContracts?.length === contracts?.length}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th>Employé</th>
              <th>Type de contrat</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Salaire annuel</th>
              <th>Statut</th>
              <th>Jours restants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts?.map((contract) => (
              <tr key={contract?.id}>
                <td>
                  <Checkbox
                    checked={selectedContracts?.includes(contract?.id)}
                    onChange={(e) => onSelectContract(contract?.id, e?.target?.checked)}
                  />
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {contract?.employeeName?.split(' ')?.map(n => n?.[0])?.join('')}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{contract?.employeeName}</div>
                      <div className="text-xs text-muted-foreground">{contract?.department}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="font-medium text-foreground">{contract?.contractType}</span>
                </td>
                <td className="text-muted-foreground">{contract?.startDate}</td>
                <td className="text-muted-foreground">{contract?.endDate}</td>
                <td className="font-medium text-foreground">{contract?.salary}</td>
                <td>{getStatusBadge(contract?.status)}</td>
                <td>
                  <span className={`font-semibold ${getUrgencyColor(contract?.daysUntilExpiration)}`}>
                    {contract?.daysUntilExpiration} jours
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetails(contract)}
                      className="p-2 rounded-md hover:bg-accent/10 transition-colors duration-150"
                      aria-label="Voir les détails"
                    >
                      <Icon name="Eye" size={18} color="var(--color-primary)" />
                    </button>
                    <button
                      className="p-2 rounded-md hover:bg-accent/10 transition-colors duration-150"
                      aria-label="Télécharger le contrat"
                    >
                      <Icon name="Download" size={18} color="var(--color-muted-foreground)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractTable;