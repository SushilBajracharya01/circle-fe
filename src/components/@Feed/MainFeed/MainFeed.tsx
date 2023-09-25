import { IMainFeedProps } from "../../../types";

/**
 * 
 */
export default function MainFeed({ children }: IMainFeedProps) {
    return (
        <div id="main-scroll" className="scroll-main main-feed w-full lg:w-[680px] mx-auto p-2">{children}</div>
    )
}