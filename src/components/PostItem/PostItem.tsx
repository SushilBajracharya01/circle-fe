import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

//
import { useAppSelector } from '../../_redux/redux';
import { IPostItemProps, IUserProps } from "../../types";

//
import PostViewModal from '../PostViewModal';
import PostContent from '../@Post/PostContent';

dayjs.extend(relativeTime)

/**
 * 
 */
export default function PostItem({ post }: IPostItemProps) {
    const user = useAppSelector<IUserProps | null>(state => state.user.user);
    const [openPostModal, setOpenPostModal] = useState<boolean>(false);

    const handleShowPostModal = () => setOpenPostModal(true);

    const [isCreator, setIsCreator] = useState(false);

    useEffect(() => {
        if (user) {
            setIsCreator(post.createdBy._id === user._id);
        }
    }, [post.createdBy._id, user]);


    return (
        <div className="rounded-xl bg-gray-100 p-2 px-3 mb-5">
            <PostContent
                post={post}
                user={user}
                isCreator={isCreator}
            />

            <div className='flex justify-between text-sm'>
                <div></div>

                <div className="text-gray-800 cursor-pointer" onClick={handleShowPostModal}>{post.commentCount} Comments</div>
            </div>

            {
                user && openPostModal &&
                <PostViewModal
                    post={post}
                    user={user}
                    isCreator={isCreator}
                    isOpen={openPostModal}
                    setIsOpen={setOpenPostModal}
                />
            }
        </div>
    )
}