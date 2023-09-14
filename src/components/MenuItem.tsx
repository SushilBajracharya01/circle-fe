import { Menu } from "@headlessui/react";
import { IMenuItemProps } from "../types";

/**
 * 
 */
export default function MenuItem({ title, icon, onClick }: IMenuItemProps) {
    return (
        <Menu.Item>
            {({ active }) => (
                <div
                    className={`z-10 cursor-pointer py-1 px-2 flex items-center transition-colors rounded ${active && 'bg-blue-500 text-white'}`}
                    onClick={onClick}
                >
                    {icon}

                    <span className='block ml-2'>
                        {title}
                    </span>
                </div>
            )}
        </Menu.Item>
    )
}