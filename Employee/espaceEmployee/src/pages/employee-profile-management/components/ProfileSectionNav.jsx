import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileSectionNav = ({ sections, activeSection, onSectionChange }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mt-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">Sections du Profil</h3>
      <nav className="space-y-1">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => onSectionChange(section?.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
              activeSection === section?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={section?.icon} size={18} />
            <span>{section?.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileSectionNav;