import { useAppSelector } from "../../_redux/redux";
import { useQueryHook } from "../../hooks/react-query/useQueryHook";
import { ICircleMainProps, IPost } from "../../types";
import Avatar from "../Avatar";
import PostItem from "../PostItem";
import PostInput from "./PostInput";

/**
 * 
 */
export default function CircleMain({ circleId }: ICircleMainProps) {
    const user = useAppSelector(state => state.user.user);
    const { data: circle, isLoading: isCircleLoading } = useQueryHook({
        queryName: `circle ${circleId}`,
        queryRoute: `/circles/${circleId}`,
    });

    const { data, isLoading } = useQueryHook({
        queryName: `circle post ${circleId}`,
        queryRoute: `/posts/${circleId}`,
    });

    console.log(data, 'data', isLoading)

    return (
        <div>
            <div>
                {
                    isCircleLoading ?
                        <div>Loading ...</div>
                        :
                        <div className="bg-blue-600 p-3 mb-3 text-white rounded-md">
                            <div className="flex items-center gap-4">
                                <Avatar isCloudinary url={circle?.result?.photo?.public_id} size="lg" isPeople={false} />

                                <div>
                                    <h2 className="text-3xl font-semibold">
                                        {circle?.result?.name}
                                    </h2>
                                    {
                                        !!circle?.result?.moto &&
                                        <div className="text-sm italic">
                                            "{circle.result.moto}""
                                        </div>
                                    }

                                    <div>
                                        {circle?.result?.description}
                                    </div>
                                </div>
                            </div>

                        </div>
                }
            </div>

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