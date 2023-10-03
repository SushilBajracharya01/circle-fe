import { Dialog } from "@headlessui/react";

//
import { AiFillCloseCircle } from "react-icons/ai";

//
import PostModalWrapper from "../@Post/PostModalWrapper";

//
import { IPostViewModalProps } from "../../types";
import PostContent from "../@Post/PostContent";
import CommentInput from "../@Comment/CommentInput";
import { useQueryHook } from "../../hooks/react-query/useQueryHook";

/**
 * 
 */
export default function PostViewModal({ isOpen, setIsOpen, post, user, isCreator }: IPostViewModalProps) {

    const { data: postComments, isLoading: isCommentLoading } = useQueryHook({
        queryName: `post ${post._id} comment`,
        queryRoute: `/posts/${post._id}/comment`,
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

            <div className="pt-2 px-3 mb-1 max-h-[300px] overflow-y-auto">
                <PostContent
                    post={post}
                    user={user}
                    isCreator={isCreator}
                />

                <div className='flex justify-between text-sm'>
                    <div></div>

                    <div className="text-gray-800 cursor-default">{post.commentCount} Comments</div>
                </div>
            </div>

            <div>
                {console.log(postComments, 'postComments')}
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