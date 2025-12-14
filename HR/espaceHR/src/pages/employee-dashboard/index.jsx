import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import KPICard from './components/KPICard';
import NotificationItem from './components/NotificationItem';
import QuickActionCard from './components/QuickActionCard';
import SystemStatusIndicator from './components/SystemStatusIndicator';
import WelcomeBanner from './components/WelcomeBanner';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    name: "Employé",
    role: "Collaborateur",
    email: "",
    lastLogin: new Date()
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');

    // Function to fetch user data
    const fetchUserData = async (token) => {
      try {
        const response = await fetch('http://localhost:5076/api/Auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem('user', JSON.stringify(userData));

          setCurrentUser({
            name: `${userData.firstName} ${userData.lastName}`,
            role: "Employé",
            email: userData.login,
            lastLogin: new Date()
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (tokenParam) {
      localStorage.setItem('authToken', tokenParam);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Fetch user data since it's no longer in URL
      fetchUserData(tokenParam);
    } else {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('authToken');

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser({
            name: `${user.firstName} ${user.lastName}`,
            role: "Employé",
            email: user.login,
            lastLogin: new Date()
          });
        } catch (e) { console.error(e); }
      } else if (storedToken) {
        // If we have token but no user data, fetch it
        fetchUserData(storedToken);
      }
    }
  }, []);

  const kpiData = [
    {
      id: 1,
      title: "Solde de Congés",
      value: "18.5",
      subtitle: "jours disponibles",
      icon: "Calendar",
      iconColor: "var(--color-primary)",
      trend: "par rapport à l\'année dernière",
      trendValue: "+2.5 jours",
      trendDirection: "up"
    },
    {
      id: 2,
      title: "Absences ce Mois",
      value: "2",
      subtitle: "jours d\'absence",
      icon: "CalendarOff",
      iconColor: "var(--color-warning)",
      trend: "par rapport au mois dernier",
      trendValue: "-1 jour",
      trendDirection: "down"
    },
    {
      id: 3,
      title: "Congés Approuvés",
      value: "3",
      subtitle: "prochains congés",
      icon: "CheckCircle2",
      iconColor: "var(--color-success)",
      trend: "prochain départ",
      trendValue: "Dans 12 jours",
      trendDirection: "neutral"
    },
    {
      id: 4,
      title: "Série de Présence",
      value: "45",
      subtitle: "jours consécutifs",
      icon: "TrendingUp",
      iconColor: "var(--color-accent)",
      trend: "record personnel",
      trendValue: "Meilleure série",
      trendDirection: "up"
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: "leave",
      title: "Demande de congé approuvée",
      message: "Votre demande de congé du 15/12/2025 au 20/12/2025 a été approuvée par votre manager.",
      timestamp: new Date(Date.now() - 1800000),
      isRead: false,
      priority: "high",
      actionLabel: "Voir détails"
    },
    {
      id: 2,
      type: "document",
      title: "Nouveau bulletin de paie disponible",
      message: "Votre bulletin de paie pour le mois de novembre 2025 est maintenant disponible dans votre espace documents.",
      timestamp: new Date(Date.now() - 7200000),
      isRead: false,
      priority: "medium",
      actionLabel: "Télécharger"
    },
    {
      id: 3,
      type: "training",
      title: "Formation obligatoire à compléter",
      message: "La formation 'Sécurité au travail 2025' doit être complétée avant le 31/12/2025. Progression actuelle: 60%",
      timestamp: new Date(Date.now() - 14400000),
      isRead: false,
      priority: "high",
      actionLabel: "Continuer"
    },
    {
      id: 4,
      type: "attendance",
      title: "Pointage manquant détecté",
      message: "Votre pointage de sortie du 28/11/2025 n\'a pas été enregistré. Veuillez régulariser votre situation.",
      timestamp: new Date(Date.now() - 21600000),
      isRead: true,
      priority: "medium",
      actionLabel: "Régulariser"
    },
    {
      id: 5,
      type: "system",
      title: "Mise à jour du profil requise",
      message: "Veuillez vérifier et mettre à jour vos informations de contact et vos coordonnées d'urgence.",
      timestamp: new Date(Date.now() - 43200000),
      isRead: true,
      priority: "low",
      actionLabel: "Mettre à jour"
    },
    {
      id: 6,
      type: "leave",
      title: "Rappel: Solde de congés",
      message: "Il vous reste 18.5 jours de congés à prendre avant la fin de l'année. Pensez à planifier vos absences.",
      timestamp: new Date(Date.now() - 86400000),
      isRead: true,
      priority: "low",
      actionLabel: "Planifier"
    },
    {
      id: 7,
      type: "document",
      title: "Contrat de travail mis à jour",
      message: "Une nouvelle version de votre contrat de travail a été ajoutée suite à votre promotion.",
      timestamp: new Date(Date.now() - 172800000),
      isRead: true,
      priority: "medium",
      actionLabel: "Consulter"
    },
    {
      id: 8,
      type: "training",
      title: "Nouvelle formation disponible",
      message: "La formation \'Leadership et Management\' est maintenant disponible. Inscrivez-vous dès maintenant.",
      timestamp: new Date(Date.now() - 259200000),
      isRead: true,
      priority: "low",
      actionLabel: "S\'inscrire"
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: "Demander un Congé",
      description: "Soumettre une nouvelle demande de congé ou RTT",
      icon: "CalendarPlus",
      iconColor: "var(--color-primary)",
      onClick: () => navigate('/leave-management-system1')
    },
    {
      id: 2,
      title: "Télécharger Documents",
      description: "Accéder à vos bulletins de paie et contrats",
      icon: "Download",
      iconColor: "var(--color-accent)",
      onClick: () => navigate('/document-management'),
      badge: "3 nouveaux"
    },
    {
      id: 3,
      title: "Scanner QR Code",
      description: "Pointer votre présence avec le code QR",
      icon: "QrCode",
      iconColor: "var(--color-success)",
      onClick: () => navigate('/qr-code-attendance-system')
    },
    {
      id: 4,
      title: "Mettre à Jour Profil",
      description: "Modifier vos informations personnelles",
      icon: "UserCog",
      iconColor: "var(--color-warning)",
      onClick: () => navigate('/employee-profile-management')
    },
    {
      id: 5,
      title: "Formations en Cours",
      description: "Continuer vos modules de formation",
      icon: "GraduationCap",
      iconColor: "var(--color-secondary)",
      onClick: () => console.log('Navigate to training'),
      badge: "2 actives"
    },
    {
      id: 6,
      title: "Historique Pointages",
      description: "Consulter votre historique de présence",
      icon: "History",
      iconColor: "var(--color-muted-foreground)",
      onClick: () => navigate('/qr-code-attendance-system')
    }
  ];

  const systemStatus = [
    {
      id: 1,
      name: "HRMS",
      status: "operational"
    },
    {
      id: 2,
      name: "Paie",
      status: "operational"
    },
    {
      id: 3,
      name: "Documents",
      status: "operational"
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    const unread = mockNotifications?.filter(n => !n?.isRead)?.length;
    setUnreadCount(unread);

    const handleKeyPress = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key?.toLowerCase()) {
          case 'n':
            e?.preventDefault();
            navigate('/notifications-center');
            break;
          case 'l':
            e?.preventDefault();
            navigate('/leave-management-system');
            break;
          case 'd':
            e?.preventDefault();
            navigate('/document-management');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notif =>
        notif?.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleNotificationAction = (notification) => {
    switch (notification?.type) {
      case 'leave': navigate('/leave-management-system');
        break;
      case 'document':
        navigate('/document-management');
        break;
      case 'training': console.log('Navigate to training module');
        break;
      case 'attendance': navigate('/qr-code-attendance-system');
        break;
      case 'system': navigate('/employee-profile-management');
        break;
      default:
        break;
    }
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications-center');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <SidebarNavigation notificationCount={unreadCount} />
        <MobileNavigationMenu notificationCount={unreadCount} />
        <TopBar currentUser={currentUser} notificationCount={unreadCount} />

        <main className="main-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WelcomeBanner
              userName={currentUser?.name}
              lastLogin={currentUser?.lastLogin}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData?.map((kpi) => (
                <KPICard key={kpi?.id} {...kpi} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="card-header">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-foreground">
                        Notifications Récentes
                      </h2>
                      <button
                        onClick={handleViewAllNotifications}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        Voir tout
                      </button>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-hide">
                      {notifications?.slice(0, 8)?.map((notification) => (
                        <NotificationItem
                          key={notification?.id}
                          notification={notification}
                          onMarkAsRead={handleMarkAsRead}
                          onAction={handleNotificationAction}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="card">
                  <div className="card-header">
                    <h2 className="text-lg font-semibold text-foreground">
                      Actions Rapides
                    </h2>
                  </div>
                  <div className="card-content">
                    <div className="space-y-3">
                      {quickActions?.map((action) => (
                        <QuickActionCard key={action?.id} {...action} />
                      ))}
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <SystemStatusIndicator systems={systemStatus} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeDashboard;