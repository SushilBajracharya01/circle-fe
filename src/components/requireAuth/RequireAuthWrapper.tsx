import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../AuthLayout";

function RequireAuth({ allowedRoles }: IRequireAuthProps) {
    const location = useLocation();
    const { token, role } = useAuth();
    console.log(token, 'require auth')
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    const content = allowedRoles.includes(role) ? (
        <AuthLayout />
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