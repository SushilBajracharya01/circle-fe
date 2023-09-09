import { IPostItemProps } from "../../types";
import Avatar from "../Avatar";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import GridPhotoPreviewer from "../GridPhotoPreviewer";

dayjs.extend(relativeTime)

/**
 * 
 */
export default function PostItem({ post }: IPostItemProps) {
    return (
        <div className="rounded bg-gray-100 px-3 py-4 mb-5">
            <div className="flex">
                <Avatar isCloudinary url={post.createdBy.photo} size="sm" />

                <div className="ml-4">
                    <h1 className="mb-0 text-md font-medium leading-snug">{post.createdBy.fullname}</h1>

                    <div className="text-sm text-gray-500 leading-none">
                        {dayjs(post.createdAt).toNow(true)}
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <div>
                    {post.content}
                </div>

                <GridPhotoPreviewer previews={post.photos} />
            </div>
        </div>
    )
}