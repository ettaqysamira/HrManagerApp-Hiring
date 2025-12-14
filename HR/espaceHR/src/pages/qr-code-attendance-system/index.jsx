import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/navigation/SidebarNavigation';
import SidebarNavigation from '../../components/navigation/SidebarNavigation';
import MobileNavigationMenu from '../../components/navigation/MobileNavigationMenu';
import TopBar from '../../components/navigation/TopBar';
import QRCodeDisplay from './components/QRCodeDisplay';
import AttendanceStatus from './components/AttendanceStatus';
import AttendanceHistory from './components/AttendanceHistory';
import AttendanceStats from './components/AttendanceStats';
import IntegrationStatus from './components/IntegrationStatus';
import QuickActions from './components/QuickActions';

const QRCodeAttendanceSystem = () => {
  const [currentUser] = useState({
    name: 'Samira ETTAQY',
    role: 'Développeuse Senior',
    employeeId: 'EMP-MAR-2024-1547'
  });

  const [notificationCount] = useState(3);

  const [employeeData] = useState({
    name: 'Samira ETTAQY',
    employeeId: 'EMP-MAR-2024-1547',
    department: 'Développement',
    position: 'Développeuse Senior',
    qrCode: 'QR-EMP-MAR-2024-1547-A7B9C3D1',
    lastRegenerated: '2025-11-29T08:30:00'
  });

  const [attendanceStatus] = useState({
    status: 'checked-in',
    lastCheckIn: '2025-11-29T08:45:00',
    lastCheckOut: null
  });

  const [attendanceHistory] = useState([
    {
      id: 1,
      timestamp: '2025-11-29T08:45:00',
      action: 'check-in',
      location: 'Siège Casablanca',
      verified: true
    },
    {
      id: 2,
      timestamp: '2025-11-28T08:42:00',
      action: 'check-in',
      location: 'Siège Casablanca',
      verified: true
    },
    {
      id: 3,
      timestamp: '2025-11-28T12:30:00',
      action: 'break-start',
      location: 'Siège Casablanca',
      verified: true
    },
    {
      id: 4,
      timestamp: '2025-11-28T13:15:00',
      action: 'break-end',
      location: 'Siège Casablanca',
      verified: true
    },
    {
      id: 5,
      timestamp: '2025-11-28T18:05:00',
      action: 'check-out',
      location: 'Siège Casablanca',
      verified: true
    }
  ]);

  const [attendanceStats] = useState({
    monthlyHours: 152,
    targetHours: 160,
    overtimeHours: 8,
    attendanceRate: 95,
    lateArrivals: 2,
    daysWorked: 19,
    workingDays: 20,
    avgDailyHours: 8
  });

  const [integrations] = useState([
    {
      id: 1,
      name: 'Paie Maroc',
      description: 'Synchronisation avec le logiciel de paie local',
      icon: 'DollarSign',
      status: 'synced',
      lastSync: '2025-11-29T12:00:00',
      pendingRecords: 0
    },
    {
      id: 2,
      name: 'Gestion RH',
      description: 'Intégration avec le système RH marocain',
      icon: 'Users',
      status: 'syncing',
      lastSync: '2025-11-29T11:45:00',
      pendingRecords: 3
    },
    {
      id: 3,
      name: 'Planification',
      description: 'Synchronisation des horaires de travail',
      icon: 'Calendar',
      status: 'synced',
      lastSync: '2025-11-29T11:30:00',
      pendingRecords: 0
    },
    {
      id: 4,
      name: 'Rapports Analytics',
      description: 'Export vers le système de reporting',
      icon: 'BarChart',
      status: 'pending',
      lastSync: '2025-11-29T10:00:00',
      pendingRecords: 12
    }
  ]);

  const handleRegenerateQR = () => {
    console.log('Régénération du code QR...');
  };

  const handleManualEntry = (data) => {
    console.log('Saisie manuelle:', data);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'r' || e?.key === 'R') {
        handleRegenerateQR();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <SidebarNavigation notificationCount={notificationCount} />
        <MobileNavigationMenu notificationCount={notificationCount} />
        <TopBar currentUser={currentUser} notificationCount={notificationCount} />

        <main className="main-content">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Système de Pointage QR</h1>
              <p className="text-muted-foreground">
                Gérez votre présence avec notre système de pointage sans contact au Maroc
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <QRCodeDisplay
                  employeeData={employeeData}
                  onRegenerate={handleRegenerateQR}
                />

                <AttendanceStatus
                  status={attendanceStatus?.status}
                  lastCheckIn={attendanceStatus?.lastCheckIn}
                  lastCheckOut={attendanceStatus?.lastCheckOut}
                />

                <AttendanceHistory history={attendanceHistory} />

                <IntegrationStatus integrations={integrations} />
              </div>

              <div className="space-y-6">
                <AttendanceStats stats={attendanceStats} />
                <QuickActions onManualEntry={handleManualEntry} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default QRCodeAttendanceSystem;
