import { Link } from "react-router-dom";
import { ISidebarItemProps } from "../../../types";
import Skeleton from "react-loading-skeleton";

export default function SidebarItem({ icon, title, href }: ISidebarItemProps) {
    return (
        <Link to={href} className="flex p-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 delay-75 rounded-md items-center gap-3">
            {icon ? icon : <Skeleton circle width={40} height={40} />}

            {
                <div className="font-medium w-full">
                    {title ? title : <Skeleton count={0.7} />}
                </div>
            }
        </Link>
    )
}