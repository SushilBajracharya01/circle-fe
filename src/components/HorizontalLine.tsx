import { IHorizontalLineProps } from "../types";

/**
 * 
 */
export default function HorizontalLine({ className }: IHorizontalLineProps) {
    return (
        <div className={className ?? ""}>
            <hr className="w-[99%] border-t-2 mx-auto my-3" />
        </div>
    )
}