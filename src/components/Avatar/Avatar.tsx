import AvatarSvg from "../../assets/Avatar";
import { IAvatarProps } from "../../types";
import CloudinaryImg from "../CloudinaryImg";

export default function Avatar({ url, size = 'md', showStatus, isOnline, isCloudinary }: IAvatarProps) {
    let classes = '';
    let sizes = { width: 40, height: 40 }
    switch (size) {
        case 'sm':
            classes = "h-10 w-10";
            sizes = { width: 40, height: 40 };
            break;
        case 'md':
            classes = "h-14 w-14"
            sizes = { width: 56, height: 56 };
            break;
        default:
    }
    return (
        <span className="inline-block relative">
            {
                url ?
                    <span className={`${classes} block bg-gray-100 rounded-full overflow-hidden`}>
                        {
                            isCloudinary ? <CloudinaryImg publicId={url} {...sizes} /> :
                                <img src={url} className={`${classes} rounded-full object-cover bg-gray-100`} />
                        }
                    </span>
                    :
                    <span className={`${classes} block bg-gray-100 rounded-full overflow-hidden`}>
                        <AvatarSvg />
                    </span>
            }
            {
                showStatus &&
                <span className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white ${isOnline ? 'bg-green-400' : 'bg-gray-300'} `} />
            }
        </span>
    )
}