import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeTable = ({ employees, selectedEmployees, onSelectEmployee, onSelectAll, onSort, sortConfig, onEmployeeClick, onQuickEdit }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const columns = [
    { key: 'select', label: '', width: '40px', sortable: false },
    { key: 'employeeId', label: 'ID', width: '80px', sortable: true },
    { key: 'name', label: 'Nom', width: 'auto', sortable: true },
    { key: 'department', label: 'Département', width: '150px', sortable: true },
    { key: 'position', label: 'Poste', width: '180px', sortable: true },
    { key: 'contractStatus', label: 'Contrat', width: '120px', sortable: true },
    { key: 'manager', label: 'Manager', width: '150px', sortable: true },
    { key: 'startDate', label: 'Date de Début', width: '120px', sortable: true },
    { key: 'status', label: 'Statut', width: '100px', sortable: true },
    { key: 'actions', label: 'Actions', width: '100px', sortable: false }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Actif': 'bg-success/10 text-success',
      'En Congé': 'bg-warning/10 text-warning',
      'Période d\'Essai': 'bg-accent/10 text-accent',
      'Inactif': 'bg-muted text-muted-foreground'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getContractStatusColor = (status) => {
    const colors = {
      'CDI': 'bg-primary/10 text-primary',
      'CDD': 'bg-warning/10 text-warning',
      'Stage': 'bg-accent/10 text-accent',
      'Freelance': 'bg-secondary/10 text-secondary'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const handleSort = (key) => {
    if (columns?.find(col => col?.key === key)?.sortable) {
      onSort(key);
    }
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig?.key !== key) return 'ChevronsUpDown';
    return sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {columns?.map(column => (
                <th
                  key={column?.key}
                  style={{ width: column?.width }}
                  className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground ${column?.sortable ? 'cursor-pointer hover:bg-muted/70' : ''}`}
                  onClick={() => column?.sortable && handleSort(column?.key)}
                >
                  {column?.key === 'select' ? (
                    <input
                      type="checkbox"
                      checked={selectedEmployees?.length === employees?.length && employees?.length > 0}
                      onChange={onSelectAll}
                      className="w-4 h-4 rounded border-border"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{column?.label}</span>
                      {column?.sortable && (
                        <Icon name={getSortIcon(column?.key)} size={14} />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee) => (
              <tr
                key={employee?.id}
                className="border-b border-border hover:bg-accent/5 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredRow(employee?.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onEmployeeClick(employee)}
              >
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedEmployees?.includes(employee?.id)}
                    onChange={() => onSelectEmployee(employee?.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-foreground">{employee?.employeeId}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={employee?.avatar}
                      alt={employee?.avatarAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">{employee?.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{employee?.department}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{employee?.position}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getContractStatusColor(employee?.contractStatus)}`}>
                    {employee?.contractStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{employee?.manager}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{employee?.startDate}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee?.status)}`}>
                    {employee?.status}
                  </span>
                </td>
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onQuickEdit(employee)}
                      className="p-1 rounded hover:bg-accent/10 transition-colors"
                      aria-label="Modifier rapidement"
                    >
                      <Icon name="Edit2" size={16} color="var(--color-primary)" />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-accent/10 transition-colors"
                      aria-label="Plus d'options"
                    >
                      <Icon name="MoreVertical" size={16} color="var(--color-muted-foreground)" />
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

export default EmployeeTable;