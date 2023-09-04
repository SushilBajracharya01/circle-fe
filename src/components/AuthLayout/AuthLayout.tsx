import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AuthLayout() {
    return (
        <div className="auth max-h-screen">
            <Header />
            <div className="auth-main">
                <Outlet />
            </div>
        </div>
    )
}