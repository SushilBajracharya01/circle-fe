import jwtDecode from "jwt-decode";
import { useAppSelector } from "../_redux/redux";
import { LOCAL_ACCESS_TOKEN_NAME } from "../constants/constants";

export default function useAuth() {
    const token = useAppSelector(state => state.auth.token) || localStorage.getItem(LOCAL_ACCESS_TOKEN_NAME);

    let isAdmin = false;
    let status = "User";

    if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(token);
        const { email, role } = decoded.UserInfo;

        isAdmin = role === 'Admin';

        if (isAdmin) status = "Admin";

        return { email: email, role: role, isAdmin, status }
    }

    return { email: '', role: "", isAdmin, status }
}