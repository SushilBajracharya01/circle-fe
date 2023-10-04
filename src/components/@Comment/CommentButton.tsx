//
import { ICommentButtonProps } from "../../types";
import { useQueryObserveHook } from "../../hooks/react-query/useQueryHook";
import { useState } from "react";

/**
 * 
 */
export default function CommentButton({ count, postId }: ICommentButtonProps) {
    const observer = useQueryObserveHook(`/posts/${postId}/comment`, `post ${postId} comment`);

    const [commentCount, setCommentCount] = useState(count);

    observer.subscribe(result => {
        try {
            setCommentCount(result.data.result.length)
        }
        catch (err) {
            console.log(err, 'commentCount')
        }
    })
    return (
        <div className="text-gray-800 cursor-default">{commentCount} Comments</div>
    )
}