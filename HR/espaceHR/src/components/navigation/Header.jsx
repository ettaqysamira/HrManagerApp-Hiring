import React, { useState } from 'react';
import Icon from '../AppIcon';
import { useSidebar } from './Sidebar';

const Header = () => {
  const { isCollapsed, toggleMobile } = useSidebar();
  const [notificationCount] = useState(8);

  return (
    <>
      <button
        onClick={toggleMobile}
        className="mobile-menu-button"
        aria-label="Toggle mobile menu"
      >
        <Icon name="Menu" size={24} />
      </button>

      <header className={`app-header ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="flex items-center gap-4">
         
        </div>

        <div className="header-actions">
          <div className="header-notification">
            <Icon name="Bell" size={20} color="var(--color-secondary2)" />
            {notificationCount > 0 && (
              <span className="header-notification-badge">
                {notificationCount}
              </span>
            )}
          </div>

          <div className="header-user">
            <div className="header-user-avatar">SE</div>
            <div className="header-user-info">
              <div className="header-user-name">Samira ETTAQY</div>
              <div className="header-user-role">Administrateur RH</div>
            </div>
            <Icon name="ChevronDown" size={16} color="var(--color-muted-foreground)" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;