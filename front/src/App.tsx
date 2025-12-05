import { useState, useRef, useEffect, MutableRefObject } from "react";

import { WindowServer } from "@molecules/window_server/window_server.tsx";
import { defaultApps, IApp } from "#/default_apps.tsx";
import { Dock } from "@molecules/dock/dock.tsx";
import { App } from "@molecules/app/app.tsx";
import { Activities } from "@molecules/activities/activities.tsx";
import { AppDrawer } from "@molecules/app-drawer/app-drawer.tsx";
import { DraggableJellyfish } from "@molecules/draggable-jellyfish/draggable-jellyfish.tsx";
import { initAppController } from "#/api/appController.ts";
import { ToastContainer } from "#/lib/toast/ToastContainer.tsx";
import { ToastProvider } from "./lib/toast";

import Draggable from "gsap/Draggable";
import gsap from "gsap";

import "@css/App.scss";

gsap.registerPlugin(Draggable);

const createDraggableApp = (uniqueKey: string) => {
    Draggable.create(`.app-id-${uniqueKey}`, {
        bounds: ".apps-container",
        trigger: `.app-id-${uniqueKey} > .app-header`,
        allowEventDefault: true,
        zIndexBoost: false,
    });
};

function Ubuntu() {
    const [appWindow, setAppWindow] = useState({
        focusAppName: "Finder",
        menuItems: [
            { label: "Fichier" },
            { label: "Éditer" },
            { label: "Présentation" },
            { label: "Aller" },
            { label: "Fenêtre" },
            { label: "Aide" },
        ],
    });

    const [apps, setApps] = useState(defaultApps);
    const [showActivities, setShowActivities] = useState(false);
    const [showAppDrawer, setShowAppDrawer] = useState(false);

    const updateAppState = (id: string, newState: 0 | 1 | 2) => {
        setApps((prevApps) =>
            prevApps.map((group) =>
                group.map((app) =>
                    app.id === id ? { ...app, state: newState } : app,
                ),
            ),
        );
    };

    useEffect(() => {
        initAppController(updateAppState);
    }, []);

    const zIndexBoost = useRef(100);

    const appsContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!appsContainer.current) return;

        apps.forEach((appGroup) =>
            appGroup.forEach((app) => {
                createDraggableApp(app.id);
            }),
        );
    }, [appsContainer]);

    const handleZIndexBoost = (
        e: MutableRefObject<HTMLDivElement | null>,
        currentApp: IApp,
    ) => {
        if (!e.current) return;
        console.log(`➡️ Focus : ${currentApp.id}`);

        e.current.style.zIndex = zIndexBoost.current.toString();
        zIndexBoost.current++;

        setAppWindow((prevState) => ({
            ...prevState,
            focusAppName: currentApp.label,
        }));
    };

    return (
        <div id="app">
            <ToastProvider>
                <WindowServer
                    {...appWindow}
                    onActivityClick={() => setShowActivities(true)}
                />
                {showActivities && <div className="activities-overlay"></div>}
                {showActivities && (
                    <Activities
                        isVisible={showActivities}
                        apps={apps}
                        onClose={() => setShowActivities(false)}
                        onAppClick={(appId) => {
                            updateAppState(appId, 2);
                        }}
                        onWindowBringToFront={(appId) => {
                            const appElement = document.querySelector(
                                `.app-id-${appId}`,
                            ) as HTMLElement;

                            const currentApp = apps
                                .flat()
                                .find((app) => app.id === appId);

                            if (appElement && currentApp) {
                                const elementRef: MutableRefObject<HTMLDivElement | null> =
                                    {
                                        current: appElement as HTMLDivElement,
                                    };
                                handleZIndexBoost(elementRef, currentApp);
                            }
                        }}
                    />
                )}
                <div className="apps-container" ref={appsContainer}>
                    {apps.map((appGroup, groupIndex) =>
                        appGroup.map((app, appIndex) => {
                            if (!app.content) return;
                            return (
                                <App
                                    label={app.label}
                                    state={app.state}
                                    uniqueKey={app.id}
                                    type={app.type}
                                    resizable={app.resizable}
                                    key={groupIndex + appIndex}
                                    onMouseDown={(e:any) => {
                                        handleZIndexBoost(e, app);
                                    }}
                                    updateState={(newState:any) =>
                                        updateAppState(app.id, newState)
                                    }
                                >
                                    {app.content}
                                </App>
                            );
                        }),
                    )}
                </div>

                <Dock
                    apps={apps}
                    updateAppState={updateAppState}
                    onShowApplications={() => setShowAppDrawer(true)}
                />

                <AppDrawer
                    isVisible={showAppDrawer}
                    apps={apps}
                    onClose={() => setShowAppDrawer(false)}
                    onAppClick={(app) => {
                        if (app.onClick) {
                            app.onClick();
                        } else {
                            updateAppState(app.id, 2);
                        }
                    }}
                />

                <div className="jellyfish-layer">
                    <DraggableJellyfish
                        src="/src/assets/jellyfish_RGB-grey_hex.svg"
                        alt="jellyfish"
                    />
                </div>
                <ToastContainer />
            </ToastProvider>
        </div>
    );
}

export default Ubuntu;
