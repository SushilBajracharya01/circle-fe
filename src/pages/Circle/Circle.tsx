import { useParams } from "react-router-dom";
import { useAppSelector } from "../../_redux/redux";
import Sidebar from "../../components/@Feed/MainFeed/Sidebar";
import ColumnLayout from "../../layout/ColumnLayout";

/**
 * 
 */
export default function CirclePage() {
    const { id } = useParams();
    const user = useAppSelector(state => state.user.user);

    return (
        <ColumnLayout
            leftComponent={
                <Sidebar user={user} />
            }
            centerComponent={
                <div>
                    Circle {id}
                </div>
            }
            rightComponent={
                <div>Sidebar</div>
            }
        />
    )
}