import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function RequireAuth({ allowedRoles }: IRequireAuthProps) {
    const location = useLocation();
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    const content = allowedRoles.includes(role) ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );

    return content;
}

export default RequireAuth;

export type allowedRolesType = 'Admin' | 'User';

interface IRequireAuthProps {
    allowedRoles: allowedRolesType[]
}