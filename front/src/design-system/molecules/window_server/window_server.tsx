import { MenuIcon } from "@atoms/menu_icon/menu_icon.tsx";
import { MenuItem } from "@atoms/menu_item/menu_item.tsx";

import "./style.scss";

interface IWindowServer {
    focusAppName: string;
    menuItems: { label: string; handleClick?: () => void }[];
    onActivityClick?: () => void;
}

export const WindowServer = ({
    focusAppName,
    onActivityClick,
}: IWindowServer) => {
    // apps.map(e => e.iconKey)

    return (
        <>
            <div className="window-server">
                <div className="window-server-left">
                    <div
                        onClick={onActivityClick}
                        style={{ cursor: "pointer" }}
                    >
                        <MenuIcon type="activity" />
                    </div>
                    <MenuItem label={focusAppName} primary={true} />
                </div>
                <div className="window-server-center">
                    <MenuIcon type="date" />
                </div>
                <div className="window-server-right">
                    <MenuIcon type="wifi" />
                    <MenuIcon type="sound" />
                    <MenuIcon type="logout" />
                </div>
            </div>
        </>
    );
};
