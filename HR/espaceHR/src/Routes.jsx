import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LeaveManagementSystemHR from './pages/leave-management-system';
import EmployeeManagement from './pages/employee-management';
import ContractAdministration from './pages/contract-administration';
import HRDashboardOverview from './pages/hr-dashboard-overview';
import CandidateManagement from './pages/candidate-management';
import AbsenceAnalyticsDashboard from './pages/absence-analytics-dashboard';
import HRAttendanceDashboard from './pages/hr-attendance-dashboard';
import CandidateProfile from "./pages/candidate-management/components/CandidateProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import QRCodeAttendanceSystem from './pages/qr-code-attendance-system';
import NotificationsCenter from './pages/notifications-center';
import SystemSettingsAndPreferences from './pages/system-settings-and-preferences';
import LeaveManagementSystemEmployee from './pages/leave-management-system1';
import EmployeeDashboard from './pages/employee-dashboard';
import EmployeeProfileManagement from './pages/employee-profile-management';
import DocumentManagement from './pages/document-management';
import ProtectedRoute from "./components/ProtectedRoute";


const queryClient = new QueryClient();

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <ScrollToTop />
            <RouterRoutes>
              <Route element={<ProtectedRoute allowedRoles={['HR']} />}>
                <Route path="/hr-overview" element={<HRDashboardOverview />} />
                <Route path="/hr-dashboard-overview" element={<HRDashboardOverview />} />
                <Route path="/contract-administration" element={<ContractAdministration />} />
                <Route path="/candidate-management" element={<CandidateManagement />} />
                <Route path="/candidate-management/candidate/:id" element={<CandidateProfile />} />
                <Route path="/absence-analytics-dashboard" element={<AbsenceAnalyticsDashboard />} />
                <Route path="/leave-management-system" element={<LeaveManagementSystemHR />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
                <Route path="/hr-attendance-dashboard" element={<HRAttendanceDashboard />} />
              </Route>

              {/* Shared Routes (HR & Employee) */}
              <Route element={<ProtectedRoute allowedRoles={['HR', 'Employee', 'Employé']} />}>
                <Route path="/qr-code-attendance-system" element={<QRCodeAttendanceSystem />} />
                <Route path="/system-settings-and-preferences" element={<SystemSettingsAndPreferences />} />
                <Route path="/notifications-center" element={<NotificationsCenter />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['Employee', 'Employé']} />}>
                <Route path="/employee" element={<EmployeeDashboard />} />
                <Route path="/employee-profile-management" element={<EmployeeProfileManagement />} />
                <Route path="/leave-management-system1" element={<LeaveManagementSystemEmployee />} />
                <Route path="/document-management" element={<DocumentManagement />} />
              </Route>

              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Routes;
