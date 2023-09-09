import { useParams } from "react-router-dom";
import { useAppSelector } from "../../_redux/redux";
import Sidebar from "../../components/@Feed/MainFeed/Sidebar";
import ColumnLayout from "../../layout/ColumnLayout";
import CircleMain from "../../components/@Circle/CircleMain";

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
                <>
                    {id ?
                        <CircleMain circleId={id} />
                        :
                        <div>Error</div>
                    }
                </>
            }
            rightComponent={
                <div>Sidebar</div>
            }
        />
    )
}