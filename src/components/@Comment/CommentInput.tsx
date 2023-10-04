import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";

//
import { commentSchema } from "../../schemas/Schemas";
import { ICommentForm, ICommentInputProps } from "../../types";
import { useMutationHook } from "../../hooks/react-query/useQueryHook";

//
import Input from "../Input";
import Avatar from "../Avatar";

//
import { BiSolidSend } from "react-icons/bi";

/**
 * 
 */
export default function CommentInput({ user, comment, postId, handleEditSuccess }: ICommentInputProps) {
    const queryClient = useQueryClient();

    const isEdit = Boolean(comment);

    const { register, handleSubmit, setValue, reset } = useForm({
        resolver: yupResolver(commentSchema),
    }
    );

    useEffect(() => {
        if (!comment) return;

        setValue('comment', comment.comment);
    }, [comment, setValue])

    const handleOnPostSuccess = () => {
        reset();
        queryClient.invalidateQueries([`post ${postId} comment`])
    }

    const handleOnPostError = () => {
        console.log('oops')
    }

    const { mutate } = useMutationHook({
        queryRoute: `/posts/${postId}/comment`,
        options: {
            onSuccess: handleOnPostSuccess,
            onError: handleOnPostError
        }
    })

    const handleOnEditSuccess = () => {
        reset();
        handleEditSuccess?.();
        queryClient.invalidateQueries([`post ${postId} comment`])
    }

    const handleOnEditError = () => {
        console.log('oops')
    }

    const { mutate: editComment } = useMutationHook({
        queryRoute: `/posts/comment/${comment?._id}`,
        method: 'patch',
        options: {
            onSuccess: handleOnEditSuccess,
            onError: handleOnEditError
        }
    })

    const onSubmit = (data: ICommentForm) => {
        if (isEdit) {
            editComment({
                comment: data.comment
            })
        }
        else {
            mutate({
                comment: data.comment,
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${isEdit ? "" : "pb-2"} px-3 `}>
            <div className="flex gap-4">
                <Avatar isCloudinary url={user?.photo} size="xs" />

                <div className="flex flex-col w-full bg-gray-100 px-2 py-1 rounded-xl">
                    <Input className="" name="comment" register={register} type="textarea" rows={2} />
                    <div className="flex justify-between mt-1">
                        <div></div>

                        <div>
                            <button className="p-2 transition-colors hover:bg-white text-primary-600 hover:text-primary-900 rounded-full">
                                <BiSolidSend fontSize={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}