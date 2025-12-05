import { AppIcon } from "@atoms/app_icon/app_icon.tsx";
import { IApp } from "#/default_apps.tsx";
import { useRef, useMemo } from "react";

import "./style.scss";

export interface DockProps {
    apps: IApp[][];
    updateAppState: (id: string, state: 0 | 1 | 2) => void;
    onShowApplications?: () => void;
}

export const Dock = ({
    apps,
    updateAppState,
    onShowApplications,
}: DockProps) => {
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

    const dockApps = useMemo(() => {
        const result: IApp[][] = [];

        apps.forEach((appsGroup) => {
            const groupApps: IApp[] = [];

            appsGroup.forEach((app) => {
                if (app.pinnedToDock || app.state === 1 || app.state === 2) {
                    groupApps.push(app);
                }
            });

            if (groupApps.length > 0) {
                result.push(groupApps);
            }
        });

        return result;
    }, [apps]);

    return (
        <div className="dock">
            <div className="dock-bg"></div>
            <div className="dock-apps">
                {dockApps.map((appsGroup, iG) => (
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
                {onShowApplications && (
                    <div className="apps-group">
                        <button
                            className="show-applications-btn"
                            onClick={onShowApplications}
                            title="Afficher les applications"
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="currentColor"
                            >
                                <rect
                                    x="4"
                                    y="4"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="14"
                                    y="4"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="24"
                                    y="4"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="4"
                                    y="14"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="14"
                                    y="14"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="24"
                                    y="14"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="4"
                                    y="24"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="14"
                                    y="24"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                                <rect
                                    x="24"
                                    y="24"
                                    width="4"
                                    height="4"
                                    rx="1.5"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
