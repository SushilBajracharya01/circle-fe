import dayjs from "dayjs";

//
import { ITimeNowProps } from "../types";

/**
 * 
 */
export default function TimeNow({ time }: ITimeNowProps) {
    return (
        <div className="relative group">
            <button data-tooltip-target="tooltip-time-now" className=" text-sm text-gray-800 cursor-pointer">
                {dayjs(time).toNow(true)}
            </button>

            <div id="tooltip-time-now" role="tooltip" className="group-hover:visible group-hover:opacity-100 invisible absolute inline-block px-3 py-2 text-sm font-medium text-white delay-500 transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 dark:bg-gray-700 md:w-max top-6 left-0 w-min z-10">

                {dayjs(time).format('dddd, MMMM DD, YYYY hh:mm A')}
                
                <div className="absolute -top-1 border-r-4 border-r-transparent border-l-4 border-l-transparent border-b-4 border-b-gray-900" data-popper-arrow></div>
            </div>
        </div>
    )
}