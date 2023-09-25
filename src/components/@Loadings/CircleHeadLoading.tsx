import Skeleton from "react-loading-skeleton"

/**
 * 
 */
export default function CircleHeadLoading() {
    return (
        <div className="bg-gray-100 p-3 mb-3 text-white rounded-md">
            <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex items-center w-full">
                    <Skeleton circle width={80} height={80} />

                    <div className="ml-3 w-full">
                        <h2 className="text-3xl font-semibold">
                            <Skeleton count={0.4} />
                        </h2>
                        <div className="text-sm italic">
                            <Skeleton count={0.6} />
                        </div>

                        <div>
                            <Skeleton count={0.7} />
                        </div>
                    </div>
                </div>

                <div className="relative flex gap-2">
                    <Skeleton count={0.1} width={1000} height={42}/>
                </div>

            </div>

        </div>
    )
}