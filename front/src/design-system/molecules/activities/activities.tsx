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
    onClose: () => void;
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
    const openApps = apps
        .flat()
        .filter((app) => app.state === 1 || app.state === 2);

    useEffect(() => {
        if (!isVisible) return;

        const appsContainer = document.querySelector(
            ".apps-container",
        ) as HTMLElement;

        if (appsContainer) {
            appsContainer.classList.add("activities-mode");
        }

        openApps.forEach((app, index) => {
            const appElement = document.querySelector(
                `.app-id-${app.id}`,
            ) as HTMLElement;

            if (!appElement) return;

            const draggables = Draggable.get(`.app-id-${app.id}`);
            if (draggables) {
                if (Array.isArray(draggables))
                    draggables.forEach((d) => d.disable());
                else draggables.disable();
            }

            const col = index % 3;
            const row = Math.floor(index / 3);
            const spacingX = 350;
            const spacingY = 280;
            const offsetX = col * spacingX + 50;
            const offsetY = row * spacingY + 150;

            appElement.style.setProperty("--activities-x", `${offsetX}px`);
            appElement.style.setProperty("--activities-y", `${offsetY}px`);

            appElement.classList.add("activities-mode");
            appElement.setAttribute("data-activities-clickable", "true");
        });

        const containerClickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const clickedWindow = target.closest(
                ".app.activities-mode[data-activities-clickable]",
            ) as HTMLElement;

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
                    onClose();
                    setTimeout(() => {
                        onAppClick(appId);
                        if (onWindowBringToFront) {
                            onWindowBringToFront(appId);
                        }
                    }, 50);
                }
            }
        };

        if (appsContainer)
            appsContainer.addEventListener("click", containerClickHandler);

        return () => {
            if (appsContainer) {
                appsContainer.removeEventListener(
                    "click",
                    containerClickHandler,
                );
                appsContainer.classList.remove("activities-mode");
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
                }
                element.classList.remove("activities-mode");
                element.style.removeProperty("--activities-x");
                element.style.removeProperty("--activities-y");
                element.removeAttribute("data-activities-clickable");
            });
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return <div className="activities-overlay" onClick={onClose}></div>;
};
