import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useQueryHook } from "../../hooks/react-query/useQueryHook";
import { useEffect } from "react";
import { handleSetUser } from "../../_redux/userSlice";
import { useAppDispatch } from "../../_redux/redux";

export default function AuthLayout() {
    const dispatch = useAppDispatch();

    const { data: userData } = useQueryHook({
        queryName: 'me',
        queryRoute: `/users/me`,
        options: {
            staleTime: 120000
        }
    });

    useEffect(() => {
        dispatch(handleSetUser(userData));
    }, [dispatch, userData]);


    return (
        <div className="auth max-h-screen">
            <Header />
            <div className="auth-main">
                <Outlet />
            </div>
        </div>
    )
}