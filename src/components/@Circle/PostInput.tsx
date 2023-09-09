import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { Dialog } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { yupResolver } from "@hookform/resolvers/yup"

//
import Input from "../Input"
import Avatar from "../Avatar"
import Button from "../Button"
import { IPostInputProps } from "../../types"
import { postSchema } from "../../schemas/Schemas"
import { useMutationHook } from "../../hooks/react-query/useQueryHook"

//
import { BiSolidImage } from "react-icons/bi"
import { AiFillCloseCircle } from "react-icons/ai"

//
import PhotoUploader from "../PhotoUploader/PhotoUploader"

/**
 * 
 */
export default function PostInput({ user, circleId }: IPostInputProps) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  }, [postImages])

  const handleShowModal = () => setIsOpen(true);
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const { mutate, isLoading } = useMutationHook({
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

    mutate(formData);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setPostImages(e.target.files);
  }

  return (
    <div className="bg-gray-200 rounded-md p-3 mb-3" >
      <div className="flex gap-3">
        <Avatar size="sm" />

        <div className="flex-1 bg-gray-50 rounded-full p-1 flex items-center pl-5 cursor-pointer hover:bg-gray-100" onClick={handleShowModal}>
          What's on your mind?
        </div>
      </div>

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

                <Dialog.Title className='text-xl font-extrabold'>Create post</Dialog.Title>

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
                    disabled={isLoading}
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
                        <BiSolidImage fontSize={24} />
                      </div>
                    </div>
                  </div>


                  <div className="mt-4">
                    <Button
                      className="w-full justify-center"
                      label="Post"
                      disabled={isLoading}
                      isLoading={isLoading}
                    />
                  </div>
                </form>

              </div>
            </Dialog.Panel>
          </div>

        </div>
      </Dialog >
    </div >
  )
}