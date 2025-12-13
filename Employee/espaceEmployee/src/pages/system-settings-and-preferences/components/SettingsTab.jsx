import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsTab = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsTab;