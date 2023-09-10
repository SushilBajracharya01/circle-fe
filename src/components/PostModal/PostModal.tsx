import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

//
import Avatar from '../Avatar'
import Input from '../Input'
import Button from '../Button'

//
import { IPostModalProps } from '../../types'

//
import { AiFillCloseCircle } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postSchema } from '../../schemas/Schemas'
import { useMutationHook } from '../../hooks/react-query/useQueryHook'
import { toast } from 'react-toastify'
import PhotoUploader from '../PhotoUploader/PhotoUploader'
import { BiSolidImageAdd } from 'react-icons/bi'

/**
 * 
 */
export default function PostModal({ isOpen, setIsOpen, user, circleId, post }: IPostModalProps) {
    const queryClient = useQueryClient();
    const isEdit = Boolean(post);

    const [showFileUpload, setShowFileUpload] = useState<boolean>(false);
    const [previewUrls, setPreviewUrls] = useState<string[] | undefined>();
    const [postImages, setPostImages] = useState<FileList | null>(null);

    useEffect(() => {
        if (postImages?.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Images: any = Array.from(postImages);

            const previews: string[] = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Images.forEach((file: any) => {
                previews.push(URL.createObjectURL(file));
            })
            setPreviewUrls(previews)
        }
        else {
            setPreviewUrls(undefined);
        }
    }, [postImages]);


    const handleHideModal = () => {
        reset();
        setIsOpen(false);
        setPreviewUrls(undefined);
        setPostImages(null);
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(postSchema),
    });


    useEffect(() => {
        if (!post) return;
        setValue('content', post.content)
    }, [post, setValue])

    const { mutate: createPost, isLoading: isCreatingLoading } = useMutationHook({
        queryRoute: '/posts',
        axiosOptions: {
            multipart: true,
        },
        options: {
            onSuccess: () => {
                toast.success('Circle created successfully.');
                queryClient.invalidateQueries({ queryKey: [`circle post ${circleId}`] });
                handleHideModal();
            }
        }
    });

    const { mutate: updatePost, isLoading: isUpdatingLoading } = useMutationHook({
        queryRoute: `/posts/${post?._id}`,
        method: "patch",
        axiosOptions: {
            multipart: true,
        },
        options: {
            onSuccess: () => {
                toast.success('Circle update successfully.');
                queryClient.invalidateQueries({ queryKey: [`circle post ${circleId}`] });
                handleHideModal();
            }
        }
    });

    const onSubmit = (data: { content: string }) => {
        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('circleId', circleId);

        if (postImages?.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Images: any = Array.from(postImages);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Images.forEach((image: any) => {
                formData.append('photo', image);
            })
        }

        if (isEdit) {
            updatePost(formData);
        }
        else {
            createPost(formData);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setPostImages(e.target.files);
    }

    const loading = isCreatingLoading || isUpdatingLoading;
    return (
        <Dialog
            open={isOpen}
            onClose={handleHideModal}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* <div className="fixed inset-0 flex w-screen items-center justify-center p-4"> */}
            <div className="fixed inset-0 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-[95%] max-w-xl rounded-md bg-white">
                        {/* Heading */}
                        <div className="flex justify-between items-center p-3 border-b border-gray-600">
                            <div></div>

                            <Dialog.Title className='text-xl font-extrabold'>{isEdit ? "Edit" : "Create"} post</Dialog.Title>

                            <AiFillCloseCircle fontSize={35} className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer" onClick={handleHideModal} />
                        </div>

                        {/* Body */}
                        <div className="p-3">
                            <div className="flex items-center mb-2">
                                <Avatar isCloudinary url={user.photo} size="sm" />

                                <div className="ml-4">
                                    <h1 className="mb-0 text-md font-medium leading-snug">{user.fullname}</h1>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    name="content"
                                    type="textarea"
                                    errors={errors}
                                    register={register}
                                    disabled={loading}
                                />

                                <div>
                                    {
                                        showFileUpload &&
                                        <div className="mt-2 border border-gray-200 rounded-md p-2 relative">
                                            <AiFillCloseCircle fontSize="30" className="cursor-pointer absolute top-2 right-2 z-10 text-gray-700" onClick={() => setShowFileUpload(false)} />

                                            <PhotoUploader handleChange={handleChange} previewUrls={previewUrls} isMulti={false} />
                                        </div>
                                    }

                                    <div className="flex justify-between items-center mt-2 border rounded-md border-gray-200 p-2">
                                        <div className="text-lg font-bold">Add to your post</div>

                                        <div
                                            className={`rounded-full ${showFileUpload ? "bg-gray-300" : "bg-gray-200"} w-10 h-10 flex justify-center items-center cursor-pointer`}
                                            onClick={() => setShowFileUpload(true)}
                                        >
                                            <BiSolidImageAdd fontSize={24} />
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-4">
                                    <Button
                                        className="w-full justify-center"
                                        label="Post"
                                        disabled={loading}
                                        isLoading={loading}
                                    />
                                </div>
                            </form>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog >
    )
}