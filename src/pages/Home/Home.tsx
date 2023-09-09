import { useAppSelector } from "../../_redux/redux";
import Sidebar from "../../components/@Feed/MainFeed/Sidebar";
import MyCircle from "../../components/@Feed/MyCircle";
import ColumnLayout from "../../layout/ColumnLayout";

export default function Home() {
  const user = useAppSelector(state => state.user.user);


  return (
    <ColumnLayout
      leftComponent={
        <Sidebar user={user} />
      }
      centerComponent={
        <div>
          <MyCircle />
        </div>
      }
      rightComponent={
        <div>Sidebar</div>
      }
    />
  )
}