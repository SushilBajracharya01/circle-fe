import { useAppSelector } from "../../_redux/redux";
import MainFeed from "../../components/@Feed/MainFeed/MainFeed";
import Sidebar from "../../components/@Feed/MainFeed/Sidebar";

export default function Feed() {
  const user = useAppSelector(state => state.user.user);

  return (
    <div className="grid grid-cols-12 md:gap-4">
      <div className="hidden md:block col-span-3 lg:col-span-2 bg-green-50 py-2 px-3">
        <Sidebar user={user} />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-8 bg-red-50">
        <MainFeed />
      </div>
      <div className="hidden md:block col-span-3 lg:col-span-2 bg-blue-50">Sidebar</div>
    </div>
  )
}