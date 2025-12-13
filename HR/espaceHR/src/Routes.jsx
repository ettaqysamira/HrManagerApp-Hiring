import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LeaveManagementSystem from './pages/leave-management-system';
import EmployeeManagement from './pages/employee-management';
import ContractAdministration from './pages/contract-administration';
import HRDashboardOverview from './pages/hr-dashboard-overview';
import CandidateManagement from './pages/candidate-management';
import AbsenceAnalyticsDashboard from './pages/absence-analytics-dashboard';
import CandidateProfile from "./pages/candidate-management/components/CandidateProfile";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
=        <Route path="/" element={<HRDashboardOverview />} />
        <Route path="/leave-management-system" element={<LeaveManagementSystem />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/contract-administration" element={<ContractAdministration />} />
        <Route path="/hr-dashboard-overview" element={<HRDashboardOverview />} />
        <Route path="/candidate-management" element={<CandidateManagement />} />
          <Route path="/candidate-management/candidate/:id" element={<CandidateProfile />} />
        <Route path="/absence-analytics-dashboard" element={<AbsenceAnalyticsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
