import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileNavigationMenu = ({ notificationCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      path: '/employee',
      icon: 'LayoutDashboard',
      priority: 1
    },
    {
      id: 'attendance',
      label: 'Pointage QR',
      path: '/qr-code-attendance-system',
      icon: 'QrCode',
      priority: 2
    },
    {
      id: 'notifications',
      label: 'Notifications',
      path: '/notifications-center',
      icon: 'Bell',
      badge: notificationCount,
      priority: 3
    },
    {
      id: 'profile',
      label: 'Mon Profil',
      path: '/employee-profile-management',
      icon: 'User',
      priority: 4
    },
    {
      id: 'leave',
      label: 'Congés',
      path: '/leave-management-system1',
      icon: 'Calendar',
      priority: 5
    },
    {
      id: 'documents',
      label: 'Documents',
      path: '/document-management',
      icon: 'FileText',
      priority: 6
    },
    {
      id: 'settings',
      label: 'Paramètres',
      path: '/system-settings-and-preferences',
      icon: 'Settings',
      priority: 7
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      <button
        onClick={toggleMenu}
        className="mobile-menu-button2"
        aria-label="Ouvrir le menu de navigation"
        aria-expanded={isOpen}
      >
        <Icon name={isOpen ? 'X' : 'Menu'} size={24} />
      </button>
      {isOpen && (
        <div
          className="mobile-menu-overlay2 animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={`mobile-menu2 ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header2">
          <div className="sidebar-logo2">
            <Icon name="Users" size={24} color="white" />
          </div>
          <span className="sidebar-brand-text2">EmployeeSpace</span>
        </div>

        <nav className="sidebar-nav2">
          {navigationItems?.sort((a, b) => a?.priority - b?.priority)?.map((item) => (
              <div
                key={item?.id}
                className={`sidebar-nav-item2 ${isActive(item?.path) ? 'active' : ''}`}
                onClick={() => handleNavigation(item?.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e?.key === 'Enter' || e?.key === ' ') {
                    handleNavigation(item?.path);
                  }
                }}
              >
                <div className="relative">
                  <Icon name={item?.icon} size={20} />
                  {item?.badge > 0 && (
                    <span className="notification-badge2">
                      {item?.badge > 99 ? '99+' : item?.badge}
                    </span>
                  )}
                </div>
                <span className="sidebar-nav-item-text2">{item?.label}</span>
              </div>
            ))}
        </nav>

        <div className="sidebar-footer2">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={20} />
            <span>Fermer</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileNavigationMenu;