import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useSidebar } from './SidebarNavigation';
import { getImageUrl } from '../../utils/imageUtils';

const TopBar = ({ currentUser = null, notificationCount = 0 }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();

  const userName = currentUser?.name || (currentUser?.firstName && currentUser?.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : (currentUser?.FirstName && currentUser?.LastName ? `${currentUser.FirstName} ${currentUser.LastName}` : 'Utilisateur'));

  const userInitials = userName !== 'Utilisateur'
    ? userName.split(' ').map((n) => n?.[0]).join('').toUpperCase().slice(0, 2)
    : 'ES';

  const userPhoto = currentUser?.photo || currentUser?.photoUrl || currentUser?.PhotoUrl;
  const userPhotoSrc = getImageUrl(userPhoto);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate('/employee-profile-management');
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate('/notifications-center');
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    window.location.href = "http://localhost:5173";
  };

  return (
    <header className={`topbar2 ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="topbar-notification2" ref={notificationRef}>
        <button
          onClick={handleNotificationsClick}
          aria-label="Notifications"
          className="relative flex items-center justify-center"
        >
          <Icon name="Bell" size={18} className="md:w-5 md:h-5" />
          {notificationCount > 0 && (
            <span className="notification-badge2">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="dropdown-menu animate-fade-in w-80 md:w-96">
            <div className="p-3 md:p-4 border-b border-border">
              <h3 className="font-semibold text-sm md:text-base text-foreground">Notifications</h3>
            </div>
            <div className="max-h-[60vh] md:max-h-96 overflow-y-auto">
              {notificationCount > 0 ? (
                <div className="p-3 md:p-4">
                  <div className="space-y-2 md:space-y-3">
                    <div className="p-2.5 md:p-3 rounded-lg bg-muted hover:bg-muted/80 cursor-pointer transition-colors duration-200">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-1 md:mt-1.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm text-foreground font-medium truncate-2-lines">
                            Nouvelle notification
                          </p>
                          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
                            Il y a 5 minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8 text-center">
                  <Icon name="Bell" size={40} className="md:w-12 md:h-12 mx-auto mb-2 md:mb-3 text-muted-foreground" />
                  <p className="text-xs md:text-sm text-muted-foreground">Aucune notification</p>
                </div>
              )}
            </div>
            <div className="p-2.5 md:p-3 border-t border-border">
              <button
                onClick={handleViewAllNotifications}
                className="w-full text-xs md:text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 py-2 touch-manipulation"
              >
                Voir toutes les notifications
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="topbar-user2" ref={userMenuRef}>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 md:gap-3"
          aria-label="Menu utilisateur"
          aria-expanded={showUserMenu}
        >
          <div className="topbar-avatar2 overflow-hidden flex items-center justify-center bg-primary/10">
            {userPhotoSrc ? (
              <img src={userPhotoSrc} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary font-bold">{userInitials}</span>
            )}
          </div>
          <div className="hidden sm:block text-left min-w-0">
            <p className="text-xs md:text-sm font-medium text-foreground truncate max-w-[120px] md:max-w-[200px]">
              {userName}
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground truncate max-w-[120px] md:max-w-[200px]">
              {currentUser?.role || currentUser?.position || 'Employé'}
            </p>
          </div>
          <Icon name="ChevronDown" size={14} className="md:w-4 md:h-4 flex-shrink-0" />
        </button>

        {showUserMenu && (
          <div className="dropdown-menu animate-fade-in w-48 md:w-56">
            <div className="p-2">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 md:py-2 rounded-lg text-xs md:text-sm text-foreground hover:bg-muted transition-colors duration-200 touch-manipulation"
              >
                <Icon name="User" size={14} className="md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">Mon Profil</span>
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/system-settings-and-preferences');
                }}
                className="w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 md:py-2 rounded-lg text-xs md:text-sm text-foreground hover:bg-muted transition-colors duration-200 touch-manipulation"
              >
                <Icon name="Settings" size={14} className="md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">Paramètres</span>
              </button>
            </div>
            <div className="border-t border-border p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 md:py-2 rounded-lg text-xs md:text-sm text-error hover:bg-error/10 transition-colors duration-200 touch-manipulation"
              >
                <Icon name="LogOut" size={14} className="md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">Déconnexion</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;