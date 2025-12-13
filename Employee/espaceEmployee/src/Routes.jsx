import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import QRCodeAttendanceSystem from './pages/qr-code-attendance-system';
import NotificationsCenter from './pages/notifications-center';
import SystemSettingsAndPreferences from './pages/system-settings-and-preferences';
import LeaveManagementSystem from './pages/leave-management-system';
import EmployeeDashboard from './pages/employee-dashboard';
import EmployeeProfileManagement from './pages/employee-profile-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/qr-code-attendance-system" element={<QRCodeAttendanceSystem />} />
        <Route path="/notifications-center" element={<NotificationsCenter />} />
        <Route path="/system-settings-and-preferences" element={<SystemSettingsAndPreferences />} />
        <Route path="/leave-management-system" element={<LeaveManagementSystem />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-profile-management" element={<EmployeeProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
