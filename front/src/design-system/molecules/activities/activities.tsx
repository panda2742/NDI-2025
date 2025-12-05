import { useEffect } from "react";
import Draggable from "gsap/Draggable";
import "./style.scss";

export interface IApp {
    id: string;
    label: string;
    state: 0 | 1 | 2;
}

interface IActivitiesProps {
    isVisible: boolean;
    apps: IApp[][];
    onClose: (clickedAppId?: string) => void;
    onAppClick: (appId: string) => void;
    onWindowBringToFront?: (appId: string) => void;
}

export const Activities = ({
    isVisible,
    apps,
    onClose,
    onAppClick,
    onWindowBringToFront,
}: IActivitiesProps) => {
    useEffect(() => {
        if (!isVisible) return;

        const appsContainer = document.querySelector(
            ".apps-container",
        ) as HTMLElement;

        if (appsContainer) {
            appsContainer.classList.add("activities-mode");
            appsContainer.style.pointerEvents = "auto";
        }

        const dock = document.querySelector(".dock") as HTMLElement;
        if (dock) {
            dock.style.display = "none";
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const openApps = apps
                    .flat()
                    .filter((app) => app.state === 1 || app.state === 2);

                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const windowDimensions: {
                    width: number;
                    height: number;
                    app: IApp;
                }[] = [];

                openApps.forEach((app) => {
                    const appElement = document.querySelector(
                        `.app-id-${app.id}`,
                    ) as HTMLElement;
                    if (appElement) {
                        const wasHidden =
                            !appElement.classList.contains("active");
                        if (wasHidden) {
                            appElement.classList.add("active");
                            appElement.style.visibility = "hidden";
                        }

                        const rect = appElement.getBoundingClientRect();
                        console.log(
                            `Window ${app.id}: ${rect.width}x${rect.height}, state: ${app.state}, visible: ${appElement.classList.contains("active")}`,
                        );

                        if (wasHidden) {
                            appElement.style.visibility = "";
                        }

                        if (rect.width > 0 && rect.height > 0) {
                            windowDimensions.push({
                                width: rect.width,
                                height: rect.height,
                                app: app,
                            });
                        }
                    }
                });

                if (windowDimensions.length === 0) {
                    return;
                }

                const totalWindows = windowDimensions.length;
                let windowsPerRow = Math.ceil(Math.sqrt(totalWindows));
                if (totalWindows <= 2) windowsPerRow = totalWindows;
                else if (totalWindows <= 4) windowsPerRow = 2;
                else if (totalWindows <= 6) windowsPerRow = 3;
                else
                    windowsPerRow = Math.min(
                        4,
                        Math.ceil(Math.sqrt(totalWindows)),
                    );

                const numRows = Math.ceil(totalWindows / windowsPerRow);

                const paddingX = 80;
                const paddingY = 120;
                const gapX = 50;
                const gapY = 40;

                const availableWidth = viewportWidth - paddingX * 2;
                const availableHeight = viewportHeight - paddingY * 2;

                const totalGapsX = (windowsPerRow - 1) * gapX;
                const totalGapsY = (numRows - 1) * gapY;

                const maxWidthPerCol: number[] = [];
                const maxHeightPerRow: number[] = [];

                windowDimensions.forEach((dim, index) => {
                    const col = index % windowsPerRow;
                    const row = Math.floor(index / windowsPerRow);

                    if (
                        !maxWidthPerCol[col] ||
                        dim.width > maxWidthPerCol[col]
                    ) {
                        maxWidthPerCol[col] = dim.width;
                    }
                    if (
                        !maxHeightPerRow[row] ||
                        dim.height > maxHeightPerRow[row]
                    ) {
                        maxHeightPerRow[row] = dim.height;
                    }
                });

                const totalUnscaledWidth = maxWidthPerCol.reduce(
                    (sum, w) => sum + w,
                    0,
                );
                const totalUnscaledHeight = maxHeightPerRow.reduce(
                    (sum, h) => sum + h,
                    0,
                );

                const scaleByWidth =
                    (availableWidth - totalGapsX) / totalUnscaledWidth;
                const scaleByHeight =
                    (availableHeight - totalGapsY) / totalUnscaledHeight;

                const optimalScale = Math.min(
                    0.8,
                    Math.max(0.15, Math.min(scaleByWidth, scaleByHeight)),
                );

                const scaledDimensions = windowDimensions.map((dim) => ({
                    ...dim,
                    scaledWidth: dim.width * optimalScale,
                    scaledHeight: dim.height * optimalScale,
                }));

                const columnWidths: number[] = [];
                const rowHeights: number[] = [];

                scaledDimensions.forEach((dim, index) => {
                    const col = index % windowsPerRow;
                    const row = Math.floor(index / windowsPerRow);

                    if (
                        !columnWidths[col] ||
                        dim.scaledWidth > columnWidths[col]
                    ) {
                        columnWidths[col] = dim.scaledWidth;
                    }
                    if (
                        !rowHeights[row] ||
                        dim.scaledHeight > rowHeights[row]
                    ) {
                        rowHeights[row] = dim.scaledHeight;
                    }
                });

                const totalGridWidth =
                    columnWidths.reduce((sum, w) => sum + w, 0) +
                    gapX * (columnWidths.length - 1);
                const totalGridHeight =
                    rowHeights.reduce((sum, h) => sum + h, 0) +
                    gapY * (rowHeights.length - 1);

                const startX = (viewportWidth - totalGridWidth) / 2;
                const startY = (viewportHeight - totalGridHeight) / 2;

                const windowElements = openApps
                    .map((app) => ({
                        app,
                        element: document.querySelector(
                            `.app-id-${app.id}`,
                        ) as HTMLElement,
                    }))
                    .filter((item) => item.element !== null);

                windowElements.forEach(({ element }) => {
                    element.style.zIndex = "10";
                });

                windowElements.forEach(({ app, element }, index) => {
                    const draggables = Draggable.get(`.app-id-${app.id}`);
                    if (draggables) {
                        if (Array.isArray(draggables))
                            draggables.forEach((d) => d.disable());
                        else draggables.disable();
                    }

                    const col = index % windowsPerRow;
                    const row = Math.floor(index / windowsPerRow);

                    let offsetX = startX;
                    for (let i = 0; i < col; i++) {
                        offsetX += columnWidths[i] + gapX;
                    }

                    let offsetY = startY;
                    for (let i = 0; i < row; i++) {
                        offsetY += rowHeights[i] + gapY;
                    }

                    element.style.setProperty("--activities-x", `${offsetX}px`);
                    element.style.setProperty("--activities-y", `${offsetY}px`);
                    element.style.setProperty(
                        "--activities-scale",
                        `${optimalScale}`,
                    );

                    element.classList.add("activities-mode");
                    element.classList.add("active");
                    element.setAttribute("data-activities-clickable", "true");
                });
            });
        });

        const handleCloseWithAnimation = (clickedAppId?: string) => {
            const overlay = document.querySelector(
                ".activities-overlay",
            ) as HTMLElement;
            if (overlay) {
                overlay.classList.add("fade-out");
            }

            const allWindows = document.querySelectorAll(
                ".app.activities-mode",
            );
            allWindows.forEach((elem) => {
                const element = elem as HTMLElement;
                const appId = element.className.match(/app-id-([^\s]+)/)?.[1];
                if (appId) {
                    const draggables = Draggable.get(`.app-id-${appId}`);
                    if (draggables) {
                        if (Array.isArray(draggables))
                            draggables.forEach((d) => d.enable());
                        else draggables.enable();
                    }

                    const app = apps.flat().find((a) => a.id === appId);
                    if (app && app.state === 1) {
                        element.classList.remove("active");
                    }
                }

                element.classList.add("activities-transitioning");
                element.classList.remove("activities-mode");
            });

            setTimeout(() => {
                onClose(clickedAppId);
            }, 250);
        };

        const containerClickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const clickedWindow = target.closest(
                ".app.activities-mode[data-activities-clickable]",
            ) as HTMLElement;
            if (
                !clickedWindow &&
                (target.classList.contains("apps-container") ||
                    target.classList.contains("activities-overlay"))
            ) {
                handleCloseWithAnimation();
                return;
            }

            if (!clickedWindow) return;

            if (
                target.closest(".controls") ||
                target.closest(".controls-btn") ||
                target.closest("button") ||
                target.closest("input") ||
                target.closest("textarea") ||
                target.closest("a") ||
                target.classList.contains("app-header")
            )
                return;
            if (target.closest(".app-body")) {
                e.stopPropagation();

                const appId =
                    clickedWindow.className.match(/app-id-([^\s]+)/)?.[1];

                if (appId) {
                    const overlay = document.querySelector(
                        ".activities-overlay",
                    ) as HTMLElement;
                    if (overlay) {
                        overlay.classList.add("fade-out");
                    }

                    const allWindows = document.querySelectorAll(
                        ".app.activities-mode",
                    );
                    allWindows.forEach((elem) => {
                        const element = elem as HTMLElement;

                        const appId =
                            element.className.match(/app-id-([^\s]+)/)?.[1];
                        if (appId) {
                            const draggables = Draggable.get(
                                `.app-id-${appId}`,
                            );
                            if (draggables) {
                                if (Array.isArray(draggables))
                                    draggables.forEach((d) => d.enable());
                                else draggables.enable();
                            }
                        }

                        const windowAppId =
                            element.className.match(/app-id-([^\s]+)/)?.[1];
                        if (windowAppId) {
                            const windowApp = apps
                                .flat()
                                .find((a) => a.id === windowAppId);
                            if (windowApp && windowApp.state === 1) {
                                element.classList.remove("active");
                            }
                        }

                        element.classList.add("activities-transitioning");
                        element.classList.remove("activities-mode");
                    });

                    setTimeout(() => {
                        onClose(appId);
                        setTimeout(() => {
                            onAppClick(appId);
                            if (onWindowBringToFront) {
                                onWindowBringToFront(appId);
                            }
                        }, 50);
                    }, 250);
                }
            }
        };

        if (appsContainer)
            appsContainer.addEventListener("click", containerClickHandler);

        const overlay = document.querySelector(
            ".activities-overlay",
        ) as HTMLElement;
        if (overlay) {
            overlay.addEventListener("click", containerClickHandler);
        }

        return () => {
            const dock = document.querySelector(".dock") as HTMLElement;
            if (dock) {
                dock.style.display = "";
            }

            if (appsContainer) {
                appsContainer.removeEventListener(
                    "click",
                    containerClickHandler,
                );
                appsContainer.classList.remove("activities-mode");

                appsContainer.style.pointerEvents = "none";
            }

            const overlay = document.querySelector(
                ".activities-overlay",
            ) as HTMLElement;
            if (overlay) {
                overlay.removeEventListener("click", containerClickHandler);
            }
            const allWindows = document.querySelectorAll(
                ".app.activities-transitioning, .app.activities-mode",
            );
            allWindows.forEach((elem) => {
                const element = elem as HTMLElement;
                const appId = element.className.match(/app-id-([^\s]+)/)?.[1];
                if (appId) {
                    const draggables = Draggable.get(`.app-id-${appId}`);
                    if (draggables) {
                        if (Array.isArray(draggables))
                            draggables.forEach((d) => d.enable());
                        else draggables.enable();
                    }

                    const app = apps.flat().find((a) => a.id === appId);
                    if (app && app.state === 1) {
                        element.classList.remove("active");
                    }
                }
                element.classList.remove("activities-mode");
                element.classList.remove("activities-transitioning");
                element.style.removeProperty("--activities-x");
                element.style.removeProperty("--activities-y");
                element.style.removeProperty("--activities-scale");
                element.removeAttribute("data-activities-clickable");
            });
        };
    }, [isVisible, apps]);

    return null;
};
