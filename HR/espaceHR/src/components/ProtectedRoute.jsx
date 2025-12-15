import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth.service";

const ProtectedRoute = ({ allowedRoles }) => {
    const user = authService.getCurrentUser();
    const token = localStorage.getItem("token");

    if (!token || !user) {
        return <Navigate to="/auth" replace />;
    }

    if (allowedRoles) {
        const userRole = user.role || user.Role;
        if (!userRole || !allowedRoles.some(role => role.toLowerCase() === userRole.toLowerCase())) {
            if (userRole === "HR") {
                return <Navigate to="/hr-overview" replace />;
            } else {
                return <Navigate to="/employee" replace />;
            }
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
