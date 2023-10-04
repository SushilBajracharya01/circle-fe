import { IHorizontalLineProps } from "../types";

/**
 * 
 */
export default function HorizontalLine({ className }: IHorizontalLineProps) {
    return (
        <div className={className ?? ""}>
            <hr className="w-[99%] border-gray-300 mx-auto my-2" />
        </div>
    )
}