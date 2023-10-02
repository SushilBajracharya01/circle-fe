import dayjs from "dayjs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { Menu, Transition } from "@headlessui/react";

//
import { IPostContentProps } from "../../types";
import { useMutationHook } from "../../hooks/react-query/useQueryHook";

//
import { BsThreeDots } from "react-icons/bs";
import { BiPencil, BiTrash } from "react-icons/bi";

//
import Avatar from "../Avatar";
import MenuItem from "../MenuItem";
import PostModal from "../PostModal";
import GridPhotoPreviewer from "../GridPhotoPreviewer";

/**
 * 
 */
export default function PostContent({ post, user, isCreator }: IPostContentProps) {
    const queryClient = useQueryClient();

    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const handleShowModal = () => setOpenEditModal(true);

    const { mutate } = useMutationHook({
        queryRoute: `/posts/${post._id}`,
        method: 'delete',
        options: {
            onSuccess: () => {
                toast.success('Deleted post successfully!');
                queryClient.invalidateQueries([`circle post ${post.circleId}`])
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
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <Fragment>
            <div className="flex justify-between items-center relative">
                <div className="flex">
                    <Avatar isCloudinary url={post.createdBy.photo} size="sm" />

                    <div className="ml-4">
                        <h1 className="mb-0 text-md font-medium leading-snug">{post.createdBy.fullname}</h1>

                        <div className="text-sm text-gray-500 leading-none">
                            {dayjs(post.createdAt).toNow(true)}
                        </div>
                    </div>
                </div>

                {
                    isCreator &&
                    <Menu>
                        <Menu.Button>
                            <BsThreeDots />
                        </Menu.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                            className="absolute bg-white rounded-md p-2 top-8 right-5 shadow-md z-10"
                        >
                            <Menu.Items className="flex flex-col">
                                <MenuItem
                                    title="Edit post"
                                    icon={<BiPencil />}
                                    handleClick={handleShowModal} />

                                <MenuItem
                                    title="Delete"
                                    type="danger"
                                    icon={<BiTrash />}
                                    handleClick={handleDelete} />
                            </Menu.Items>
                        </Transition>
                    </Menu>
                }

            </div>

            <div className="mt-2">
                <div className="whitespace-pre">
                    {post.content}
                </div>

                <GridPhotoPreviewer previews={post.photos} />
            </div>


            {
                user && openEditModal &&
                <PostModal
                    circleId={post.circleId}
                    isOpen={openEditModal}
                    setIsOpen={setOpenEditModal}
                    user={user}
                    post={post}
                />
            }
        </Fragment>
    )
}