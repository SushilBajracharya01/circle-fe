import { ISidebarProps } from "../../../types";
import Avatar from "../../Avatar";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ user }: ISidebarProps) {
    return (
        <div>
            <SidebarItem icon={<Avatar url={user?.photo?.public_id} isCloudinary size="sm" />} title={user?.fullname} href="/profile" />
        </div>
    )
}