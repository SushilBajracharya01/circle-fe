import { useAppSelector } from "../../_redux/redux";
import { useQueryHook } from "../../hooks/react-query/useQueryHook";
import { ICircleMainProps, IPost } from "../../types";
import PostItem from "../PostItem";
import PostInput from "./PostInput";

/**
 * 
 */
export default function CircleMain({ circleId }: ICircleMainProps) {
    const user = useAppSelector(state => state.user.user);
    const { data, isLoading } = useQueryHook({
        queryName: `circle ${circleId}`,
        queryRoute: `/posts/${circleId}`,
    });

    console.log(data, 'data', isLoading)

    return (
        <div>
            {
                user &&
                <PostInput user={user} circleId={circleId} />
            }

            <div>
                {
                    data?.results?.map((post: IPost) => (
                        <PostItem post={post} key={post._id} />
                    ))
                }
            </div>
        </div>
    )
}