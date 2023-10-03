import { NavLink } from "react-router-dom";
import { INavButtonProps } from "../../../types";

export default function NavButton({ to, label, icon }: INavButtonProps) {
    return (
        <NavLink to={to} className={({ isActive }) => {
            return `p-2 ${isActive ? 'border-4 border-primary-500 rounded-lg text-primary-500' : ''}`
        }}>
            <span className="sr-only">{label}</span>
            {icon}
        </NavLink>
    )
}