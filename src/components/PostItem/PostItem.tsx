import { IPostItemProps } from "../../types";
import Avatar from "../Avatar";

/**
 * 
 */
export default function PostItem({ post }: IPostItemProps) {
    return (
        <div className="rounded bg-gray-50 p-3 mb-3">
            <div className="flex">
                <Avatar isCloudinary url={post.createdBy.photo} size="sm" />

                <div className="ml-4">
                    <h1 className="mb-0 text-md font-medium leading-snug">{post.createdBy.fullname}</h1>

                    <div className="text-sm leading-none">
                        {post.createdAt}
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <div>
                    {post.content}
                </div>
            </div>
        </div>
    )
}