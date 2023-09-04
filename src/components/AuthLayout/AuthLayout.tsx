import { useState } from "react";
import { Outlet } from "react-router-dom";

//
import SideMenu from "../@AuthLayout/SideMenu";
import AuthHeader from "../@AuthLayout/AuthHeader";

/**
 * 
 */
export default function AuthLayout() {
    const [showMenu, setShowMenu] = useState(() => {
        const showMenuLocalStorage = localStorage.getItem('showSideMenu');
        if (showMenuLocalStorage) {
            return showMenuLocalStorage === 'true' ? true : false;
        }
        return true;
    });

    const handleToggleMenu = () => {
        setShowMenu((prev) => {
            const newState = !prev;
            localStorage.setItem('showSideMenu', String(newState));
            return newState;
        });
    };

    return (
        <div className="auth-layout min-h-screen">
            <AuthHeader showMenu={showMenu} handleToggleMenu={handleToggleMenu} />

            <div className="auth-body">
                <SideMenu showMenu={showMenu} />

                <div className={`rounded-s-xl p-4 bg-[#f5f8fc] ${showMenu ? "main-content" : 'main-content-sm'}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}