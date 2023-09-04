import AvatarSvg from "../../assets/Avatar";
import { IAvatarProps } from "../../types";

export default function Avatar({ url, size = 'md', showStatus, isOnline }: IAvatarProps) {
    let classes = '';
    switch (size) {
        case 'md':
            classes = "h-14 w-14"
            break;
        default:
    }
    return (
        <span className="inline-block relative">
            {
                url ?
                    <img src={url} className={`${classes} rounded-full object-cover bg-gray-100`} /> :
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