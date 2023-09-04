import { IAuthHeaderProps } from "../../../types";

export default function AuthHeader({ showMenu, handleToggleMenu }: IAuthHeaderProps) {
    return (
        <div onClick={handleToggleMenu}> AuthHeader
            {showMenu && ":mome"}

        </div>
    )
}