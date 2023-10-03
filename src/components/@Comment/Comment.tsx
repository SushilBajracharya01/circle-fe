//
import { ICommentProps } from "../../types";

//
import Avatar from "../Avatar";
import TimeNow from "../TimeNow";

/**
 * 
 */
export default function Comment({ comment }: ICommentProps) {
    return (
        <div className="flex gap-4 pb-2 px-3 mb-1">
            <Avatar isCloudinary url={comment.createdBy.photo} size="xs" />

            <div className="flex flex-col">
                <div className="py-0.5 px-3 rounded-xl bg-gray-200 text-gray-800 break-all">
                    <h4 className="text-sm font-semibold">{comment.createdBy.fullname}</h4>
                    {comment.comment}
                </div>

                <div className="flex gap-4">
                    <TimeNow time={comment.createdAt} />
                </div>
            </div>
        </div>
    )
}