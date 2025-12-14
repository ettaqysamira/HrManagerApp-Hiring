import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NotificationCategoryItem from './components/NotificationCategoryItem';
import NotificationListItem from './components/NotificationListItem';
import NotificationDetailPanel from './components/NotificationDetailPanel';
import NotificationFilterBar from './components/NotificationFilterBar';
import BulkActionsBar from './components/BulkActionsBar';

const NotificationsCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    readStatus: 'all',
    priority: 'all',
    dateRange: 'all'
  });

  const currentUser = {
    name: "Fatima Zahra",
    role: "Employée RH",
    email: "fatima.zahra@employeespace.ma"
  };

  const categories = [
    { id: 'all', label: 'Toutes les notifications', icon: 'Inbox', unreadCount: 12 },
    { id: 'hr_alerts', label: 'Alertes RH', icon: 'AlertCircle', unreadCount: 5 },
    { id: 'leave_updates', label: 'Mises à jour congés', icon: 'Calendar', unreadCount: 3 },
    { id: 'training', label: 'Rappels formation', icon: 'GraduationCap', unreadCount: 2 },
    { id: 'system', label: 'Annonces système', icon: 'Bell', unreadCount: 2 },
    { id: 'archived', label: 'Archivées', icon: 'Archive', unreadCount: 0 }
  ];

  const mockNotifications = [
    {
      id: 1,
      category: 'hr_alerts',
      sender: 'Service RH',
      subject: 'Mise à jour du règlement intérieur',
      preview: 'Le règlement intérieur a été mis à jour, consultez les nouvelles règles sur le télétravail et horaires flexibles.',
      content: `Bonjour Fatima,\n\nLe règlement intérieur de l'entreprise a été mis à jour pour s'adapter à nos nouvelles pratiques.\n\nPrincipales modifications :\n- Télétravail jusqu'à 3 jours/semaine\n- Horaires flexibles entre 8h et 19h\n- Mise à jour procédures sécurité\n\nEn vigueur dès le 1er décembre 2025.\n\nMerci,\nService RH`,
      timestamp: new Date('2025-11-29T10:30:00'),
      priority: 'high',
      isRead: false,
      hasAttachment: true,
      requiresAction: true,
      attachments: [
        { name: 'Reglement_Interieur_2025.pdf', size: '2.4 MB' },
        { name: 'Guide_Teletravail.pdf', size: '1.8 MB' }
      ],
      relatedActions: [
        { label: 'Accuser réception', icon: 'Check' },
        { label: 'Télécharger documents', icon: 'Download' }
      ]
    },
    {
      id: 2,
      category: 'leave_updates',
      sender: 'Système congés',
      subject: 'Demande de congé approuvée',
      preview: 'Votre congé du 15 au 19 décembre 2025 a été validé par votre manager.',
      content: `Bonjour Fatima,\n\nVotre demande de congé est approuvée.\n\nDétails :\n- Type : Congés payés\n- Du 15/12/2025 au 19/12/2025\n- Validé par : Jean Martin\n\nSolde restant : 18 jours\n\nBon repos !\nService RH`,
      timestamp: new Date('2025-11-29T09:15:00'),
      priority: 'medium',
      isRead: false,
      hasAttachment: false,
      requiresAction: false,
      relatedActions: [
        { label: 'Voir planning', icon: 'Calendar' },
        { label: 'Consulter solde', icon: 'Clock' }
      ]
    },
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
    setSelectedNotification(mockNotifications?.[0]);
  }, []);

  useEffect(() => {
    let filtered = [...notifications];
    if (selectedCategory !== 'all') filtered = filtered.filter(n => n.category === selectedCategory);
    if (filters.readStatus !== 'all') filtered = filtered.filter(n => filters.readStatus === 'read' ? n.isRead : !n.isRead);
    if (filters.priority !== 'all') filtered = filtered.filter(n => n.priority === filters.priority);
    if (searchQuery) {
      filtered = filtered.filter(n =>
        n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredNotifications(filtered);
  }, [selectedCategory, filters, searchQuery, notifications]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedNotifications([]);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleMarkAsRead = () => {
    if (selectedNotification) {
      setNotifications(prev =>
        prev.map(n => n.id === selectedNotification.id ? { ...n, isRead: !n.isRead } : n)
      );
      setSelectedNotification(prev => ({ ...prev, isRead: !prev.isRead }));
    }
  };

  const handleArchive = () => console.log('Archiver notification:', selectedNotification?.id);
  const handleDelete = () => console.log('Supprimer notification:', selectedNotification?.id);
  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSearch = (query) => setSearchQuery(query);

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) setSelectedNotifications([]);
    else setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const handleMarkAllRead = () => console.log('Marquer toutes comme lues:', selectedNotifications);
  const handleArchiveSelected = () => console.log('Archiver sélectionnées:', selectedNotifications);
  const handleDeleteSelected = () => console.log('Supprimer sélectionnées:', selectedNotifications);
  const handleClearSelection = () => setSelectedNotifications([]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <SidebarNavigation notificationCount={unreadCount} />
        <MobileNavigationMenu notificationCount={unreadCount} />
        <TopBar currentUser={currentUser} notificationCount={unreadCount} />

        <main className="main-content">
          <div className="h-screen flex flex-col pt-0">
            <div className="bg-card border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">Centre de Notifications</h1>
                  <p className="text-sm text-muted-foreground">Gérez toutes vos communications et alertes RH</p>
                </div>
                <Button variant="outline" iconName="Settings">Préférences</Button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              <aside className="w-64 bg-card border-r border-border overflow-y-auto">
                <div className="p-4 space-y-1">
                  {categories.map(category => (
                    <NotificationCategoryItem
                      key={category.id}
                      category={category}
                      isActive={selectedCategory === category.id}
                      onClick={() => handleCategoryChange(category.id)}
                    />
                  ))}
                </div>
              </aside>

              <div className="flex-1 flex flex-col overflow-hidden">
                <NotificationFilterBar
                  onFilterChange={handleFilterChange}
                  onSearch={handleSearch}
                  totalCount={filteredNotifications.length}
                  unreadCount={filteredNotifications.filter(n => !n.isRead).length}
                  selectedCount={selectedNotifications.length}
                />

                <BulkActionsBar
                  selectedCount={selectedNotifications.length}
                  totalCount={filteredNotifications.length}
                  allSelected={selectedNotifications.length === filteredNotifications.length}
                  onSelectAll={handleSelectAll}
                  onMarkAllRead={handleMarkAllRead}
                  onArchiveSelected={handleArchiveSelected}
                  onDeleteSelected={handleDeleteSelected}
                  onClearSelection={handleClearSelection}
                />

                <div className="flex-1 flex overflow-hidden">
                  <div className="w-2/5 border-r border-border overflow-y-auto">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map(notification => (
                        <NotificationListItem
                          key={notification.id}
                          notification={notification}
                          isSelected={selectedNotification?.id === notification.id}
                          onClick={() => handleNotificationClick(notification)}
                        />
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Icon name="Inbox" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">Aucune notification</h3>
                        <p className="text-sm text-muted-foreground">Aucune notification ne correspond à vos critères</p>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 bg-card overflow-hidden">
                    <NotificationDetailPanel
                      notification={selectedNotification}
                      onMarkAsRead={handleMarkAsRead}
                      onArchive={handleArchive}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default NotificationsCenter;
