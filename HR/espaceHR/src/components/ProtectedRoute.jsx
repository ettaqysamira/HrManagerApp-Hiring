import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth.service";

const ProtectedRoute = ({ allowedRoles }) => {
    const user = authService.getCurrentUser();
    const token = localStorage.getItem("token");

    if (!token || !user) {
        return <Navigate to="/auth" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === "HR") {
            return <Navigate to="/hr-overview" replace />;
        } else {
            return <Navigate to="/employee-dashboard" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
