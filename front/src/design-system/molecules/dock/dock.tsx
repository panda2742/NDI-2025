import { AppIcon } from "@atoms/app_icon/app_icon.tsx";
import { IApp } from "#/default_apps.tsx";
import { useRef } from "react";

import "./style.scss";

export interface DockProps {
    apps: IApp[][];
    updateAppState: (id: string, state: 0 | 1 | 2) => void;
}

export const Dock = ({ apps, updateAppState }: DockProps) => {
    const handleClick = (app: IApp) => {
        if (app.state === 2) {
            updateAppState(app.id, 1);
            console.log(`Minimize : ${app.id}`);
        } else {
            updateAppState(app.id, 2);
            console.log(`Open : ${app.id}`);
        }
    };

    const index = useRef(0);

    return (
        <div className="dock">
            <div className="dock-bg"></div>
            <div className="dock-apps">
                {apps.map((appsGroup, iG) => (
                    <div className="apps-group" key={iG}>
                        {appsGroup.map((app) => {
                            index.current++;

                            return (
                                <AppIcon
                                    onClick={() => handleClick(app)}
                                    {...app}
                                    key={index.current}
                                    index={index.current}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
