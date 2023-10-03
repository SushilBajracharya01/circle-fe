import { Dialog } from "@headlessui/react";

//
import { AiFillCloseCircle } from "react-icons/ai";

//
import PostModalWrapper from "../@Post/PostModalWrapper";

//
import { IComment, IPostViewModalProps } from "../../types";
import PostContent from "../@Post/PostContent";
import CommentInput from "../@Comment/CommentInput";
import { useQueryHook } from "../../hooks/react-query/useQueryHook";
import Comment from "../@Comment/Comment";
import HorizontalLine from "../HorizontalLine";

/**
 * 
 */
export default function PostViewModal({ isOpen, setIsOpen, post, user, isCreator }: IPostViewModalProps) {

    const { data: postComments, isLoading: isCommentLoading } = useQueryHook({
        queryName: `post ${post._id} comment`,
        queryRoute: `/posts/${post._id}/comment`,
        options: {
            enabled: Boolean(post.commentCount)
        }
    });

    console.log(postComments, 'postComments')
    const handleHideModal = () => {
        setIsOpen(false);
    }

    return (
        <PostModalWrapper
            isOpen={isOpen}
            handleHideModal={handleHideModal}
        >
            {/* Heading */}
            <div className="flex justify-between items-center p-3 border-b border-gray-600">
                <div></div>

                <Dialog.Title className='text-xl font-extrabold'>{post.createdBy.fullname}'s post</Dialog.Title>

                <AiFillCloseCircle fontSize={35} className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer" onClick={handleHideModal} />
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
                <div className="pt-2 px-3 mb-1 max-h-[300px] overflow-y-auto">
                    <PostContent
                        post={post}
                        user={user}
                        isCreator={isCreator}
                    />

                    <HorizontalLine />

                    <div className='flex justify-between text-sm'>
                        <div></div>

                        <div className="text-gray-800 cursor-default">{post.commentCount} Comments</div>
                    </div>
                </div>

                <HorizontalLine className="px-3" />

                <div className="pt-2 px-3 ">
                    {
                        isCommentLoading && <div>Loading ...</div>
                    }
                    {
                        postComments?.result.map((comment: IComment) => <Comment key={comment._id} comment={comment} />)
                    }
                </div>
            </div>

            {
                user &&
                <div>
                    <CommentInput
                        user={user}
                        postId={post._id}
                    />
                </div>
            }

        </PostModalWrapper>
    )
}