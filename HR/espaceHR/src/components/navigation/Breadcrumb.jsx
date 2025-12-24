import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routeLabels = {
    '/hr-dashboard-overview': 'Tableau de Bord',
    '/hr-overview': 'Tableau de Bord',
    '/employee-management': 'Gestion des Employés',
    '/contract-administration': 'Administration des Contrats',
    '/leave-management-system': 'Gestion des Congés',
    '/hr-attendance-dashboard': 'Gestion des Présences',
    '/job-offers': 'Offres d\'Emploi',
    '/candidate-management': 'Gestion des Candidats',
    '/absence-analytics-dashboard': 'Analytique Absences',
    '/notifications-center': 'Centre de Notifications',
    '/system-settings-and-preferences': 'Paramètres Système',
  };

  const pathSegments = location?.pathname?.split('/')?.filter(Boolean);

  const breadcrumbItems = pathSegments?.map((segment, index) => {
    const path = `/${pathSegments?.slice(0, index + 1)?.join('/')}`;
    return {
      label: routeLabels?.[path] || segment,
      path: path,
      isLast: index === pathSegments?.length - 1,
    };
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (breadcrumbItems?.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumb px-6 py-4" aria-label="Breadcrumb">
      <div
        className="breadcrumb-item"
        onClick={() => handleNavigation('/')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e?.key === 'Enter' || e?.key === ' ') {
            handleNavigation('/');
          }
        }}
      >
        <Icon name="Home" size={16} />
      </div>
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={item?.path}>
          <span className="breadcrumb-separator">
            <Icon name="ChevronRight" size={16} />
          </span>
          <div
            className={`breadcrumb-item ${item?.isLast ? 'active' : ''}`}
            onClick={() => !item?.isLast && handleNavigation(item?.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (!item?.isLast && (e?.key === 'Enter' || e?.key === ' ')) {
                handleNavigation(item?.path);
              }
            }}
          >
            {item?.label}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;