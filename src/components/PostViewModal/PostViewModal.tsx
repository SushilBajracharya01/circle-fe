import { Dialog } from "@headlessui/react";

//
import { AiFillCloseCircle } from "react-icons/ai";

//
import HorizontalLine from "../HorizontalLine";
import PostContent from "../@Post/PostContent";
import PostComments from "../@Comment/PostComments";
import CommentInput from "../@Comment/CommentInput";
import CommentButton from "../@Comment/CommentButton";
import PostModalWrapper from "../@Post/PostModalWrapper";

//
import { IPostViewModalProps } from "../../types";


/**
 * 
 */
export default function PostViewModal({ isOpen, setIsOpen, post, user, isCreator }: IPostViewModalProps) {
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
                <div className="pt-2 px-3 mb-1 overflow-y-auto">
                    <PostContent
                        post={post}
                        user={user}
                        isCreator={isCreator}
                    />

                    <HorizontalLine />

                    <div className='flex justify-between text-sm'>
                        <div></div>

                        <CommentButton count={post.commentCount} postId={post._id} />
                    </div>
                </div>

                <HorizontalLine className="px-3" />

                <PostComments shouldFetch={Boolean(post.commentCount)} postId={post._id} isCreator={isCreator} />
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