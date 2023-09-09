import { IPostInputProps } from "../../types"
import Avatar from "../Avatar"

/**
 * 
 */
export default function PostInput({ circleId }: IPostInputProps) {
  console.log(circleId, 'post')
  return (
    <div className="bg-gray-200 rounded-md p-3 mb-3">
      <div className="flex gap-3">
        <Avatar size="sm" />

        <div className="flex-1 bg-gray-50 rounded-full p-1 flex items-center pl-5 cursor-pointer">
          What's on your mind?
        </div>

      </div>
    </div>
  )
}