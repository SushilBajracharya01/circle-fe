import { IDropDownButtonProps } from "../../../types";

export default function DropDownButton({ label, icon, onClick }: IDropDownButtonProps) {
    return (
        <button className="hover:bg-slate-100 py-2 px-2 rounded-md flex items-center gap-4" onClick={onClick}>
            <span className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">{icon}</span>
            {label}
        </button>
    )
}