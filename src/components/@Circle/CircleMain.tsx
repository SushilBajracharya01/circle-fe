import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "../../_redux/redux";
import { Menu, Transition } from "@headlessui/react";
import { useMutationHook, useQueryHook } from "../../hooks/react-query/useQueryHook";

//
import { FiPlus } from "react-icons/fi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

//
import Button from "../Button";
import Avatar from "../Avatar";
import PostItem from "../PostItem";
import MenuItem from "../MenuItem";
import PostInput from "./PostInput";

//
import { ICircleMainProps, IPost, IUserProps } from "../../types";

/**
 * 
 */
export default function CircleMain({ circleId }: ICircleMainProps) {
    const navigate = useNavigate();
    const user = useAppSelector<IUserProps | null>(state => state.user.user);
    const [isCreator, setIsCreator] = useState(false);



    const { data: circle, isLoading: isCircleLoading } = useQueryHook({
        queryName: `circle ${circleId}`,
        queryRoute: `/circles/${circleId}`,
    });

    const { data } = useQueryHook({
        queryName: `circle post ${circleId}`,
        queryRoute: `/posts/${circleId}`,
    });

    const handleOnDeleteSuccess = () => {
        navigate('/');
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        );


    };
    const handleOnDeleteError = () => { };

    const { mutate } = useMutationHook({
        queryRoute: `/circles/${circleId}`,
        method: 'delete',
        options: {
            onSuccess: handleOnDeleteSuccess,
            onError: handleOnDeleteError
        }
    })

    useEffect(() => {
        if (user && circle?.result?.createdBy) {
            setIsCreator(circle.result.createdBy === user._id);
        }
    }, [circle, circle?.result?.createdBy?._id, user]);


    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: "#d22",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                mutate({});
            }
        })
    }

    return (
        <div>
            <div>
                {
                    isCircleLoading ?
                        <div>Loading ...</div>
                        :
                        <div className="bg-blue-600 p-3 mb-3 text-white rounded-md">
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex items-center">
                                    <Avatar isCloudinary url={circle?.result?.photo?.public_id} size="lg" isPeople={false} />

                                    <div className="ml-3">
                                        <h2 className="text-3xl font-semibold">
                                            {circle?.result?.name}
                                        </h2>
                                        {
                                            !!circle?.result?.moto &&
                                            <div className="text-sm italic">
                                                "{circle.result.moto}""
                                            </div>
                                        }

                                        <div>
                                            {circle?.result?.description}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex gap-2">
                                    <Button icon={<FiPlus />} label="Invite" />

                                    {
                                        isCreator &&
                                        <Menu>
                                            <Menu.Button>
                                                <BsThreeDotsVertical />
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
                                                        title="Edit"
                                                        icon={<BiPencil />}
                                                        disabled
                                                    />

                                                    <hr className="my-1" />

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

                            </div>

                        </div>
                }
            </div>

            {
                user &&
                <PostInput user={user} circleId={circleId} />
            }

            <div>
                {
                    data?.results?.map((post: IPost) => (
                        <PostItem post={post} key={post._id} />
                    ))
                }
            </div>
        </div>
    )
}