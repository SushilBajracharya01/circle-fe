import { BiImage } from "react-icons/bi";
import AvatarSvg from "../../assets/Avatar";
import { IAvatarProps } from "../../types";
import CloudinaryImg from "../CloudinaryImg";

export default function Avatar({ url, size = 'md', showStatus, isOnline, isCloudinary, isPeople = true }: IAvatarProps) {
    let classes = '';
    let sizes = { width: 40, height: 40 }
    switch (size) {
        case 'xs':
            classes = "h-8 w-8";
            sizes = { width: 38, height: 38 };
            break;
        case 'sm':
            classes = "h-10 w-10";
            sizes = { width: 40, height: 40 };
            break;
        case 'md':
            classes = "h-14 w-14"
            sizes = { width: 56, height: 56 };
            break;
        case 'lg':
            classes = "h-20 w-20"
            sizes = { width: 80, height: 80 };
            break;
        case 'xl':
            classes = "h-24 w-24"
            sizes = { width: 96, height: 96 };
            break;
        case '4xl':
            classes = "h-36 w-36"
            sizes = { width: 140, height: 140 };
            break;
        default:
    }
    return (
        <span className="inline-block relative">
            <span className={`${classes} bg-gray-100 rounded-full overflow-hidden border-4 border-gray-300 flex justify-center items-center`}>
                {
                    url ?
                        <>
                            {
                                isCloudinary ? <CloudinaryImg publicId={url} {...sizes
                                } /> :
                                    <img src={url} className={`${classes} rounded-full object-cover bg-gray-100`} />
                            }
                        </>
                        :
                        <>
                            {
                                isPeople ?
                                    <AvatarSvg />
                                    :
                                    <BiImage className={`${classes} scale-75 text-gray-500`} />
                            }
                        </>
                }
            </span>
            {
                showStatus &&
                <span className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white ${isOnline ? 'bg-green-400' : 'bg-gray-300'} `} />
            }
        </span>
    )
}