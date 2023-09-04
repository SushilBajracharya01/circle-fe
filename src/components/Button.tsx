import { VscLoading } from "react-icons/vsc";
import { IButtonProps } from "../types";

export default function Button({ varient = 'primary', label, type = "submit", onClick, icon, disabled, isLoading }: IButtonProps) {
    let classes = 'inline-flex items-center px-4 py-2 border shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-75 ';
    switch (varient) {
        case 'primary':
            classes += 'border-transparent text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-100';
            break;
        case 'outline-primary':
            classes += 'border-primary-500 text-primary-500 bg-white hover:bg-primary-500 hover:text-white focus:ring-primary-100';
            break;
        case 'secondary':
            classes += 'border-transparent text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-400';
            break;
        case 'outline-secondary':
            classes += 'border-secondary-500 text-secondary-500 bg-white hover:bg-secondary-500 hover:text-white focus:ring-secondary-400';
            break;
        default:
    }
    return (
        <button type={type}
            className={classes}
            onClick={() => onClick?.()}
            disabled={disabled}
        >
            {
                isLoading ? <VscLoading className="spin" /> : <>
                    {
                        icon &&
                        <span className="mr-2 block">{icon}</span>
                    }

                    {label}
                </>
            }
        </button>
    )
}