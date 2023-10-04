import { useQueryHook } from '../../hooks/react-query/useQueryHook';

//
import { IComment, IPostCommentsProps } from '../../types';

//
import Comment from './Comment';
import CommentLoading from '../@Loadings/CommentLoading';

/**
 * 
 */
export default function PostComments({ postId, shouldFetch, isCreator }: IPostCommentsProps) {
    const { data: postComments, isLoading: isCommentLoading } = useQueryHook({
        queryName: `post ${postId} comment`,
        queryRoute: `/posts/${postId}/comment`,
        options: {
            enabled: shouldFetch
        }
    });

    return (
        <div className="pt-2 px-3 ">
            {
                isCommentLoading && <CommentLoading count={2} />
            }
            {
                postComments?.result.map((comment: IComment) => <Comment key={comment._id} comment={comment} isCreator={isCreator} />)
            }
        </div>
    )
}