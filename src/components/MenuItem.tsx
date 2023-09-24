import { Menu } from "@headlessui/react";
import { IMenuItemProps } from "../types";

/**
 * 
 */
export default function MenuItem({ title, icon, disabled, handleClick, type='normal' }: IMenuItemProps) {
    let style = {
        bg: 'bg-blue-500',
        text: 'text-gray-800'
    };
    switch (type) {
        case 'danger':
            style = {
                bg: 'bg-red-500',
                text: 'text-red-600'
            }
            break;
        default:
            style = {
                bg: 'bg-blue-500',
                text: 'text-gray-800'
            }
    }
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    className={`z-10 cursor-pointer py-1 px-2 flex items-center transition-colors ${style.text} rounded ${active && `${style.bg} text-white`} disabled:bg-gray-200 disabled:opacity-60`}
                    onClick={() => handleClick?.()}
                    disabled={disabled}
                >
                    {icon}

                    <span className='block ml-2'>
                        {title}
                    </span>
                </button>
            )}
        </Menu.Item>
    )
}