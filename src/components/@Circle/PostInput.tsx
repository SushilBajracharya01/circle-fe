import { useState } from "react"

//
import Avatar from "../Avatar"
import PostModal from "../PostModal"

//
import { IPostInputProps } from "../../types"

/**
 * 
 */
export default function PostInput({ user, circleId, resetPage }: IPostInputProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleShowModal = () => setIsOpen(true);


  return (
    <div className="bg-gray-200 rounded-xl p-3 mb-3" >
      <div className="flex gap-3">
        <Avatar size="sm" />

        <div className="flex-1 bg-gray-50 rounded-full p-1 flex items-center pl-5 cursor-pointer hover:bg-gray-100" onClick={handleShowModal}>
          What's on your mind?
        </div>
      </div>

      <PostModal
        circleId={circleId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        resetPage={resetPage}
      />
    </div >
  )
}