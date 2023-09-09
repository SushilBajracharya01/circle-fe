import { IPhotoInputProps } from "../../types";
import Avatar from "../Avatar";

export default function PhotoInput({ previewUrl, onPhotoChange, className }: IPhotoInputProps) {
    return (
        <div className={`flex items-center ${className}`}>
            <div className="flex justify-start items-center">
                <Avatar url={previewUrl} />
            </div>
            <input
                type="file"
                onChange={onPhotoChange}
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
        </div>
    )
}

