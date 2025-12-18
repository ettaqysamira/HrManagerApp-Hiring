import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isMobileOpen,
        toggleCollapse,
        toggleMobile,
        closeMobile,
      }}
    >
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

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();

  const navigationItems = [
    {
      label: 'Tableau de Bord',
      path: '/hr-dashboard-overview',
      icon: 'LayoutDashboard',
      badge: null,
    },
    {
      label: 'Gestion Employés',
      path: '/employee-management',
      icon: 'Users',
      badge: null,
    },
    {
      label: 'Gestion Contrats',
      path: '/contract-administration',
      icon: 'FileText',
      badge: 3,
    },
    {
      label: 'Gestion Présence',
      path: '/hr-attendance-dashboard',
      icon: 'Clock',
      badge: null,
    },
    {
      label: 'Gestion Congés',
      path: '/leave-management-system',
      icon: 'Calendar',
      badge: 5,
    },
    {
      label: 'Offres d\'Emploi',
      path: '/job-offers',
      icon: 'Briefcase',
      badge: null,
    },
    {
      label: 'Gestion Candidats',
      path: '/candidate-management',
      icon: 'UserPlus',
      badge: null,
    },
    {
      label: 'Analytique Absences',
      path: '/absence-analytics-dashboard',
      icon: 'BarChart3',
      badge: null,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    closeMobile();
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      {isMobileOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar3 ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Icon name="Building2" size={24} color="var(--color-primary)" />
          </div>
          <span className="sidebar-logo-text">HR Dashboard</span>
        </div>

        <nav className="sidebar-nav">
          {navigationItems?.map((item) => (
            <div
              key={item?.path}
              className={`sidebar-nav-item ${isActive(item?.path) ? 'active' : ''
                }`}
              onClick={() => handleNavigation(item?.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' || e?.key === ' ') {
                  handleNavigation(item?.path);
                }
              }}
            >
              <Icon name={item?.icon} size={20} />
              <span className="sidebar-nav-item-text ">{item?.label}</span>
              {item?.badge && (
                <span className="sidebar-nav-item-badge">{item?.badge}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex w-full items-center justify-center p-2 rounded-md hover:bg-accent/10 transition-colors duration-150"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              size={20}
            />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;