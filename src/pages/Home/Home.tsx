import { useAppSelector } from "../../_redux/redux";
import MainFeed from "../../components/@Feed/MainFeed/MainFeed";
import Sidebar from "../../components/@Feed/MainFeed/Sidebar";
import MyCircle from "../../components/@Feed/MyCircle";

export default function Home() {
  const user = useAppSelector(state => state.user.user);


  return (
    <div className="grid grid-cols-12 md:gap-4">
      <div className="hidden md:block col-span-3 lg:col-span-2 py-2 px-3">
        <Sidebar user={user} />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-8">
        <MainFeed>
          <MyCircle />

        </MainFeed>
      </div>
      <div className="hidden md:block col-span-3 lg:col-span-2">Sidebar</div>
    </div>
  )
}