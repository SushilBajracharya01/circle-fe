import Skeleton from "react-loading-skeleton";

/**
 * 
 */
export default function PostInputLoading() {
    return (
        <div className="bg-gray-100 rounded-md p-3 mb-3" >
            <div className="flex items-center flex-1 gap-3 w-full">
                <Skeleton circle width={40} height={40} />

                <div className="w-full">
                    <Skeleton borderRadius={99999} className="w-full h-[40px]" count={1} />
                </div>
            </div>
        </div>
    )
}