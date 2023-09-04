import { NavLink } from "react-router-dom";
import { INavButtonProps } from "../../../types";

export default function NavButton({ to, label, icon }: INavButtonProps) {
    return (
        <NavLink to={to} className={({ isActive }) => {
            return `p-2 ${isActive ? 'border-4 border-primary-500 bg-primary-100 rounded-full' : ''}`
        }}>
            <span className="sr-only">{label}</span>
            {icon}
        </NavLink>
    )
}