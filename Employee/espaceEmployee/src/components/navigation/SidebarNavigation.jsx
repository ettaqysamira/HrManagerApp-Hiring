import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

const SidebarNavigation = ({ notificationCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      path: '/employee-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Vue d\'ensemble de vos activités RH'
    },
    {
      id: 'profile',
      label: 'Mon Profil',
      path: '/employee-profile-management',
      icon: 'User',
      tooltip: 'Gérer vos informations personnelles'
    },
    {
      id: 'leave',
      label: 'Congés',
      path: '/leave-management-system',
      icon: 'Calendar',
      tooltip: 'Demandes et suivi de congés'
    },
    {
      id: 'documents',
      label: 'Documents',
      path: '/document-management',
      icon: 'FileText',
      tooltip: 'Accéder à vos documents RH'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      path: '/notifications-center',
      icon: 'Bell',
      badge: notificationCount,
      tooltip: 'Centre de notifications'
    },
    {
      id: 'attendance',
      label: 'Pointage QR',
      path: '/qr-code-attendance-system',
      icon: 'QrCode',
      tooltip: 'Système de pointage sans contact'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      path: '/system-settings-and-preferences',
      icon: 'Settings',
      tooltip: 'Préférences et configuration'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Icon name="Users" size={20} className="md:w-6 md:h-6 text-white" />
        </div>
        <span className="sidebar-brand-text">EmployeeSpace</span>
      </div>
      <nav className="sidebar-nav">
        {navigationItems?.map((item) => (
          <div
            key={item?.id}
            className={`sidebar-nav-item ${isActive(item?.path) ? 'active' : ''}`}
            onClick={() => handleNavigation(item?.path)}
            title={isCollapsed ? item?.tooltip : ''}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e?.key === 'Enter' || e?.key === ' ') {
                e?.preventDefault();
                handleNavigation(item?.path);
              }
            }}
          >
            <div className="relative flex-shrink-0">
              <Icon name={item?.icon} size={18} className="md:w-5 md:h-5" />
              {item?.badge > 0 && (
                <span className="notification-badge">{item?.badge > 99 ? '99+' : item?.badge}</span>
              )}
            </div>
            <span className="sidebar-nav-item-text text-sm">{item?.label}</span>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button
          onClick={toggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 touch-manipulation"
          aria-label={isCollapsed ? 'Développer la barre latérale' : 'Réduire la barre latérale'}
        >
          <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={18} className="md:w-5 md:h-5" />
          {!isCollapsed && <span>Réduire</span>}
        </button>
      </div>
    </aside>
  );
};

export default SidebarNavigation;