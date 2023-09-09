import MainFeed from "../../components/@Feed/MainFeed/MainFeed";
import { IColumnLayoutProps } from "../../types";

export default function ColumnLayout({ leftComponent, centerComponent, rightComponent }: IColumnLayoutProps) {
    return (
        <div className="grid grid-cols-12 md:gap-4">
            <div className="hidden md:block col-span-3 lg:col-span-2 py-2 px-3">
                {leftComponent}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-8">
                <MainFeed>
                    {centerComponent}
                </MainFeed>
            </div>
            <div className="hidden md:block col-span-3 lg:col-span-2">
                {rightComponent}
            </div>
        </div>
    )
}