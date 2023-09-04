import { ISideMenuProps } from "../../../types";

export default function SideMenu({ showMenu }: ISideMenuProps) {
    return (
        <div>SideMenu
            {
                showMenu ? 'si' : 'no'
            }
        </div>
    )
}