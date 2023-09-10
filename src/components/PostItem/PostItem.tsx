import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Menu, Transition } from "@headlessui/react";

//
import Avatar from "../Avatar";
import GridPhotoPreviewer from "../GridPhotoPreviewer";

//
import { IMenuItemProps, IPostItemProps } from "../../types";

//
import { BsThreeDots } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';
import { useState } from 'react';
import PostModal from '../PostModal';
import { useAppSelector } from '../../_redux/redux';

dayjs.extend(relativeTime)

/**
 * 
 */
export default function PostItem({ post }: IPostItemProps) {
    const user = useAppSelector(state => state.user.user);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const handleShowModal = () => setOpenEditModal(true);

    return (
        <div className="rounded bg-gray-100 px-3 py-4 mb-5">
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
                        className="absolute bg-white rounded-md p-2 top-8 right-5 shadow-md"
                    >
                        <Menu.Items className="flex flex-col">
                            <MenuItem
                                title="Edit post"
                                icon={<BiPencil />}
                                onClick={handleShowModal} />
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            <div className="mt-2">
                <div className="whitespace-pre">
                    {post.content}
                </div>

                <GridPhotoPreviewer previews={post.photos} />
            </div>

            {
                user &&
                <PostModal
                    circleId={post.circleId}
                    isOpen={openEditModal}
                    setIsOpen={setOpenEditModal}
                    user={user}
                    post={post}
                />
            }
        </div>
    )
}

const MenuItem = ({ title, icon, onClick }: IMenuItemProps) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <div
                    className={`cursor-pointer py-1 px-2 flex items-center transition-colors rounded ${active && 'bg-blue-500 text-white'}`}
                    onClick={onClick}
                >
                    {icon}

                    <span className='block ml-2'>
                        {title}
                    </span>
                </div>
            )}
        </Menu.Item>
    )
}