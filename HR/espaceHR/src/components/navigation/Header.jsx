import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useSidebar } from './Sidebar';

import { notificationApi } from '../../services/api';

const Header = () => {
  const { isCollapsed, toggleMobile } = useSidebar();
  const [notificationCount, setNotificationCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationApi.getNotifications();
        const unreadCount = response.data.filter(n => !n.isRead).length;
        setNotificationCount(unreadCount);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = "http://localhost:5173";
  };

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    navigate('/system-settings-and-preferences');
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    console.log("Navigate to HR Profile");
  };

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
          <div
            className="header-notification cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/notifications-center')}
          >
            <Icon name="Bell" size={20} color="var(--color-secondary2)" />
            {notificationCount > 0 && (
              <span className="header-notification-badge">
                {notificationCount}
              </span>
            )}
          </div>

          <div className="header-user relative" ref={userMenuRef}>
            <button
              className="flex items-center gap-3 focus:outline-none"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="header-user-avatar">SE</div>
              <div className="header-user-info text-left">
                <div className="header-user-name">Samira ETTAQY</div>
                <div className="header-user-role">Administrateur RH</div>
              </div>
              <Icon name="ChevronDown" size={16} color="var(--color-muted-foreground)" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 px-2">Samira ETTAQY</p>
                  <p className="text-xs text-gray-500 px-2">samira@ettaqy.com</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Icon name="User" size={16} />
                    <span>Mon Profil</span>
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Paramètres</span>
                  </button>
                </div>
                <div className="border-t border-gray-100 p-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;