import Skeleton from "react-loading-skeleton";
import { ISidebarProps } from "../../../types";
import Avatar from "../../Avatar";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ user }: ISidebarProps) {
    return (
        <div>
            <div className="rounded-md bg-slate-100 p-4 mb-3">
                <div className="flex justify-center">
                    <Avatar url={user?.photo?.public_id} isCloudinary size="lg" />
                </div>

                <div className="text-center text-sm text-gray-700 mt-2 break-words">
                    <h3 className="text-lg font-bold">
                        {
                            user?.fullname ? user?.fullname : <Skeleton count={0.7} />
                        }
                    </h3>
                    @{
                        user?.username ? user?.username : <Skeleton count={0.} />
                    }
                </div>
            </div>

            <SidebarItem title={user?.fullname} href="/profile" />
        </div>
    )
}