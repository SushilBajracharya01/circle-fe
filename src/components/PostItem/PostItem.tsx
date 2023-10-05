import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

//
import { useAppSelector } from '../../_redux/redux';
import { IPostItemProps, IUserProps } from "../../types";

//
import PostViewModal from '../PostViewModal';
import PostContent from '../@Post/PostContent';
import HorizontalLine from '../HorizontalLine';

//
import { BiComment, BiLike } from 'react-icons/bi';

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

            <HorizontalLine />

            <div className='flex justify-between text-sm'>
                <div></div>

                <div className="text-gray-800 cursor-pointer" onClick={handleShowPostModal}>{post.commentCount} Comments</div>
            </div>

            <HorizontalLine />
            <div className='flex gap-1'>
                <div className='flex justify-center items-center flex-1 hover:bg-white cursor-pointer rounded-lg p-1'>
                    <BiLike className="mr-1" /> <span>Like</span>
                </div>
                <div
                    className='flex justify-center items-center flex-1 hover:bg-white cursor-pointer rounded-lg p-1'
                    onClick={handleShowPostModal}>
                    <BiComment className="mr-1" /> <span>Comment</span>
                </div>
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