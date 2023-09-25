import Skeleton from "react-loading-skeleton";

//
import { IPostListLoadingProps } from "../../types";

/**
 * 
 */
export default function PostListLoading({ postCounts }: IPostListLoadingProps) {
    return (
        <div>
            {
                Array(postCounts).fill(0).map((_, index: number) => (
                    <div key={index} className="rounded bg-gray-100 px-3 py-4 mb-5">
                        <div className="flex justify-between items-center relative">
                            <div className="flex w-full">
                                <Skeleton circle width={40} height={40} />

                                <div className="ml-4 w-full">
                                    <h1 className="mb-0 text-md font-medium leading-snug"><Skeleton count={0.4} /></h1>

                                    <div className="text-sm text-gray-500 leading-none">
                                        <Skeleton count={0.1}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="whitespace-pre">
                                <Skeleton count={2.5} />
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}