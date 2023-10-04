//
import { BsThreeDots } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";

//
import Avatar from "../Avatar";
import TimeNow from "../TimeNow";

//
import { ICommentProps, IUserProps } from "../../types";
import MenuItem from "../MenuItem";
import { BiPencil, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import { useMutationHook } from "../../hooks/react-query/useQueryHook";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useState } from "react";
import CommentInput from "./CommentInput";
import { useAppSelector } from "../../_redux/redux";

/**
 * 
 */
export default function Comment({ comment, isCreator }: ICommentProps) {
    const queryClient = useQueryClient();
    const user = useAppSelector<IUserProps | null>(state => state.user.user);

    const [showEdit, setShowEdit] = useState<boolean>(false);

    const { mutate } = useMutationHook({
        queryRoute: `/posts/comment/${comment._id}`,
        method: 'delete',
        options: {
            onSuccess: () => {
                toast.success('Deleted post successfully!');
                queryClient.invalidateQueries([`post ${comment.postId} comment`])
            }
        }
    })

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: "#d22",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({});

                Swal.fire(
                    'Deleted!',
                    'Your comment has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleShowEdit = () => setShowEdit(true);
    const handleHideEdit = () => setShowEdit(false);

    const onEditSuccess = () => {
        handleHideEdit();
    }

    return (
        <div className="mb-1 flex items-start group/container relative">
            {
                showEdit && user &&
                <div className="w-full">
                    <CommentInput postId={comment.postId} comment={comment} user={user} handleEditSuccess={onEditSuccess} />
                    <span className="ml-16 mb-2 block text-sm text-primary-500 cursor-pointer hover:underline" onClick={handleHideEdit}>cancel</span>
                </div>
            }

            {
                !showEdit &&
                <div className="flex gap-4 pb-2 px-3">
                    <Avatar isCloudinary url={comment.createdBy.photo} size="xs" />

                    <div className="flex flex-col">

                        {
                            <div className="py-0.5 px-3 rounded-xl bg-gray-200 text-gray-800 break-all">
                                <h4 className="text-sm font-semibold">{comment.createdBy.fullname}</h4>
                                {comment.comment}
                            </div>
                        }

                        <div className="flex gap-4">
                            <TimeNow time={comment.createdAt} />
                        </div>
                    </div>
                </div>
            }


            {
                isCreator &&
                !showEdit &&
                <Menu>
                    <div className="relative">
                        <Menu.Button>
                            <div className="opacity-0 rounded-full h-8 w-8 grid place-items-center bg-gray-200 transition-opacity delay-100 group-hover/container:opacity-100 cursor-pointer">
                                <BsThreeDots />
                            </div>
                        </Menu.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                            className="absolute bg-white rounded-md p-2 top-8 w-32 shadow-md z-10"
                        >
                            <Menu.Items className="flex flex-col">
                                <MenuItem
                                    title="Edit"
                                    icon={<BiPencil />}
                                    handleClick={handleShowEdit} />

                                <MenuItem
                                    title="Delete"
                                    type="danger"
                                    icon={<BiTrash />}
                                    handleClick={handleDelete} />
                            </Menu.Items>
                        </Transition>
                    </div>
                </Menu>
            }


        </div>

    )
}