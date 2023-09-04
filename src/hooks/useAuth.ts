import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../_redux/redux";
import { LOCAL_ACCESS_TOKEN_NAME } from "../constants/constants";
import { setCredentials } from "../_redux/authSlice";

export default function useAuth() {
    const dispatch = useAppDispatch();
    const reduxToken = useAppSelector(state => state.auth.token);
    let token: string | null = reduxToken;
    if (!reduxToken) {
        const localToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_NAME)
        if (localToken) {
            token = localToken;
            dispatch(setCredentials(token))
        }
    }

    let isAdmin = false;
    let status = "User";

    if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(token);
        const { _id, email, role } = decoded.UserInfo;

        isAdmin = role === 'Admin';

        if (isAdmin) status = "Admin";

        return { _id, email, role, isAdmin, status, token }
    }

    return { email: '', role: "", isAdmin, status }
}