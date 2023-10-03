import Skeleton from "react-loading-skeleton";
import { IListLoadingProps } from "../../types";

/**
 * 
 */
export default function CommentLoading({ count }: IListLoadingProps) {
    return (
        <div>
            {
                Array(count).fill(0).map((_, index: number) => (
                    <div key={index} className="px-6 py-4 mb-1">
                        <div className="flex justify-between items-center relative">
                            <div className="flex w-full">
                                <Skeleton circle width={38} height={38} />

                                <div className="ml-4 w-full py-0.5 px-3 rounded-xl bg-gray-100">
                                    <h1 className="text-md font-medium leading-snug mb-1"><Skeleton count={0.3} /></h1>

                                    <div className="text-sm text-gray-500">
                                        <Skeleton count={2.1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}