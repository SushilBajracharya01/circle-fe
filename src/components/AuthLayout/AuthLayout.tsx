import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useQueryHook } from "../../hooks/react-query/useQueryHook";
import { useEffect } from "react";
import { handleSetUser } from "../../_redux/userSlice";
import { useAppDispatch } from "../../_redux/redux";
import { handleSetNotifications } from "../../_redux/notificationSlice";

export default function AuthLayout() {
    const dispatch = useAppDispatch();

    const { data: userData } = useQueryHook({
        queryName: 'me',
        queryRoute: `/users/me`,
        options: {
            staleTime: 120000
        }
    });

    const { date: notificationData } = useQueryHook({
        queryName: 'notification',
        queryRoute: '/notification',
    })

    useEffect(() => {
        dispatch(handleSetUser(userData));
    }, [dispatch, userData]);

    useEffect(() => {
        dispatch(handleSetNotifications(notificationData));
    }, [dispatch, notificationData]);

    return (
        <div className="auth max-h-screen">
            <Header />
            <div className="auth-main">
                <Outlet />
            </div>
        </div>
    )
}