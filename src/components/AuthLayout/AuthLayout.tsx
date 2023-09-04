import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function AuthLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}