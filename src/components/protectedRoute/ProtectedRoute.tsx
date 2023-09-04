import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute() {
    const location = useLocation();
    const { token } = useAuth();

    const content = !token ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );

    return content;
}

export default ProtectedRoute;
