import { MenuIcon } from "@atoms/menu_icon/menu_icon.tsx";
import {MenuItem} from "@atoms/menu_item/menu_item.tsx";

import './style.scss'


interface IWindowServer {
    focusAppName: string
    menuItems: {label: string, handleClick?: () => void}[]
}

export const WindowServer = ({focusAppName, menuItems}:IWindowServer) => {
    // apps.map(e => e.iconKey)



    return <>
        <div className="window-server">
            <div className="window-server-left">
                <MenuIcon type='apple' />
                <MenuItem label={focusAppName} primary={true} />
                {menuItems.map((item, i) =>
                    <MenuItem label={item.label} onClick={item.handleClick} key={i}/>
                )}
            </div>
            <div className="window-server-right">
                <MenuIcon type='wifi'/>
                <MenuIcon type='spotlight'/>
                <MenuIcon type='users'/>
                <MenuIcon type='settings'/>
                <MenuIcon type='date'/>
            </div>
        </div>
    </>
}
