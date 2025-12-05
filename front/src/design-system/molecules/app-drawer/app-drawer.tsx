import { useEffect, useState, useRef } from "react";
import { IApp } from "#/default_apps.tsx";
import { AppIcon } from "@atoms/app_icon/app_icon.tsx";
import "./style.scss";

interface IAppDrawerProps {
    isVisible: boolean;
    apps: IApp[][];
    onClose: () => void;
    onAppClick: (app: IApp) => void;
}

export const AppDrawer = ({
    isVisible,
    apps,
    onClose,
    onAppClick,
}: IAppDrawerProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const previewContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVisible) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (previewContainerRef.current) {
            const previewContainer = previewContainerRef.current;

            previewContainer.innerHTML = "";

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight - 24 - 68;

            const miniWidth = 600;
            const miniHeight = 340;

            apps.flat()
                .filter((app) => app.state === 1 || app.state === 2)
                .forEach((app) => {
                    const appElement = document.querySelector(
                        `.app-id-${app.id}`,
                    ) as HTMLElement;

                    if (!appElement) return;

                    const rect = appElement.getBoundingClientRect();

                    const percentX = rect.left / viewportWidth;
                    const percentY = (rect.top - 24) / viewportHeight;
                    const percentWidth = rect.width / viewportWidth;
                    const percentHeight = rect.height / viewportHeight;

                    const miniX = percentX * miniWidth;
                    const miniY = percentY * miniHeight;
                    const miniW = percentWidth * miniWidth;
                    const miniH = percentHeight * miniHeight;

                    const wrapper = document.createElement("div");
                    wrapper.className = "desktop-preview-window-wrapper";
                    wrapper.style.cssText = `
                        position: absolute;
                        left: ${miniX}px;
                        top: ${miniY}px;
                        width: ${miniW}px;
                        height: ${miniH}px;
                        overflow: hidden;
                        pointer-events: none;
                    `;

                    const scaleX = miniW / rect.width;
                    const scaleY = miniH / rect.height;
                    const scale = Math.min(scaleX, scaleY);

                    const clone = appElement.cloneNode(true) as HTMLElement;
                    clone.style.cssText = `
                        transform: scale(${scale});
                        transform-origin: top left;
                        width: ${rect.width}px;
                        height: ${rect.height}px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        pointer-events: none;
                    `;

                    clone.querySelectorAll("*").forEach((el) => {
                        (el as HTMLElement).style.pointerEvents = "none";
                    });

                    wrapper.appendChild(clone);
                    previewContainer.appendChild(wrapper);
                });

            const jellyfishLayer = document.querySelector(
                ".jellyfish-layer",
            ) as HTMLElement;

            if (jellyfishLayer) {
                const jellyfish = jellyfishLayer.querySelector(
                    ".draggable-jellyfish",
                ) as HTMLElement;

                if (jellyfish) {
                    const miniX = miniWidth / 2;
                    const miniY = miniHeight / 2;

                    const wrapper = document.createElement("div");
                    wrapper.className = "desktop-preview-fish-wrapper";
                    wrapper.style.cssText = `
                        position: absolute;
                        left: ${miniX}px;
                        top: ${miniY}px;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                        z-index: -1;
                        width: 100px;
                        height: 50px;
                    `;

                    wrapper.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 200 100"
                             style="width: 100%; height: 100%; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));"
                             opacity="0.2">

                            <defs>
                                <style>
                                    .t1{fill:#888888;}
                                    .t2{fill:#A0A0A0;}
                                    .t3{fill:#6E6E6E;}
                                    .eye{fill:#3A3A3A;}
                                </style>
                            </defs>

                            <polygon class="t1" points="20,50 60,20 110,20 150,50 110,80 60,80"/>
                            <polygon class="t2" points="60,20 80,50 60,80"/>
                            <polygon class="t3" points="110,20 130,50 110,80"/>
                            <polygon class="t1" points="150,50 180,30 180,70"/>
                            <polygon class="t2" points="80,20 95,5 110,20"/>
                            <polygon class="t2" points="80,80 95,95 110,80"/>
                            <circle class="eye" cx="45" cy="50" r="6"/>
                            <circle cx="47" cy="48" r="2" fill="#ffffff"/>
                        </svg>

                    `;

                    previewContainer.appendChild(wrapper);
                }
            }
        }

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isVisible, onClose, apps]);

    useEffect(() => {
        if (!isVisible) {
            setSearchQuery("");
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const allApps = apps.flat().filter((app) => !app.hide);
    const filteredApps = searchQuery
        ? allApps.filter((app) =>
              app.label.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : allApps;

    const handleAppClick = (app: IApp) => {
        onAppClick(app);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            <div className="app-drawer-overlay" onClick={handleOverlayClick}>
                <div className="app-drawer-container">
                    <div className="desktop-preview-wrapper">
                        <div className="desktop-preview-label">Bureau</div>
                        <div
                            className="desktop-preview-backdrop"
                            onClick={onClose}
                            title="Cliquer pour fermer"
                        >
                            <div
                                className="desktop-preview-content"
                                ref={previewContainerRef}
                            ></div>
                        </div>
                    </div>

                    <div className="app-drawer-header">
                        <input
                            type="text"
                            className="app-drawer-search"
                            placeholder="Rechercher une application..."
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="app-drawer-grid">
                        {filteredApps.length > 0 ? (
                            filteredApps.map((app, index) => (
                                <div
                                    className="app-drawer-item"
                                    key={app.id}
                                    onClick={() => handleAppClick(app)}
                                >
                                    <AppIcon
                                        {...app}
                                        index={index}
                                        onClick={() => handleAppClick(app)}
                                    />
                                    <span className="app-drawer-item-label">
                                        {app.label}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="app-drawer-no-results">
                                <p>Aucune application trouvée</p>
                                <span>Essayez un autre terme de recherche</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
