import { Link } from "react-router-dom";
import { ISidebarItemProps } from "../../../types";

export default function SidebarItem({ icon, title, href }: ISidebarItemProps) {
    return (
        <Link to={href} className="flex p-2 hover:bg-gray-200 transition-colors duration-200 delay-75 rounded-md items-center gap-3">
            {icon}

            {title && <div className="font-medium">{title}</div>}
        </Link>
    )
}