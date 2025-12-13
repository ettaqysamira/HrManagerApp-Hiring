import React from 'react';


const LeaveBalanceCard = ({ employee, balances }) => {
  const getBalanceColor = (used, total) => {
    const percentage = (used / total) * 100;
    if (percentage >= 80) return 'text-error';
    if (percentage >= 60) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="card-elevated p-4 mb-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">
            {employee?.initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">
            {employee?.name}
          </h4>
          <p className="text-xs text-muted-foreground">{employee?.department}</p>
        </div>
      </div>
      <div className="space-y-2">
        {balances?.map((balance) => (
          <div key={balance?.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: balance?.color }}
              />
              <span className="text-xs text-muted-foreground">
                {balance?.type}
              </span>
            </div>
            <span
              className={`text-xs font-medium ${getBalanceColor(
                balance?.used,
                balance?.total
              )}`}
            >
              {balance?.remaining}/{balance?.total}j
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalanceCard;