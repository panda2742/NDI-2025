import {
    PropsWithChildren,
    useState,
    useEffect,
    useRef,
    MutableRefObject,
} from "react";
import "./style.scss";
import "./style-project.scss";
import "./style-application.scss";
import "./style-contact.scss";

import { Controls } from "@atoms/controls/controls.tsx";
import { openFullscreen } from "#/lib/fullscreen.tsx";

const ACCEPTED_FULLSCREEN_APP_TYPES: IAppC["type"][] = ["project"];

export interface IApp {
    label: string;
    id: string;
    content: ReactElement | null;
    iconKey:
        | "whatsweb"
        | "whatsecosystem"
        | "server"
        | "rootme"
        | "oknestor"
        | "terminal"
        | "contact"
        | "document"
        | "pages";
    state: 0 | 1 | 2;
    type: "application" | "project" | "contact";
    onClick?: () => void;
    pinnedToDock?: boolean;
    hide?: boolean;
    resizable?: boolean;
}

export const App = ({
    label,
    uniqueKey,
    state,
    type,
    children,
    onMouseDown = () => {},
    updateState = () => {},
    resizable = true,
}: PropsWithChildren<IAppC>) => {
    const [isVisible, setVisibility] = useState(state === 2);

    const component = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!component.current) return;
        setVisibility(state === 2);
        onMouseDown(component);
    }, [state]);

    const bodyRef = useRef<HTMLDivElement>(null);

    const MIN_WIDTH = 650;
    const MIN_HEIGHT = 400;

    const MAX_WIDTH = 2350;
    const MAX_HEIGHT = 1200;

    const [dimensions, setDimensions] = useState({ width: 777, height: 430 });
    const [position, setPosition] = useState({ left: 100, top: 100 });
    const [isResizing, setIsResizing] = useState(false);

    const [resizeDir, setResizeDir] = useState<
        "left" | "right" | "corner" | "bottom" | null
    >(null);
    const startPosRef = useRef({ x: 0, y: 0 });
    const startRectRef = useRef<DOMRect | null>(null);
    const containerRectRef = useRef<DOMRect | null>(null);

    useEffect(() => {
        const el = component.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        startRectRef.current = rect;

        const container = document.querySelector(
            ".apps-container",
        ) as HTMLElement | null;
        const containerRect = container?.getBoundingClientRect() || null;
        containerRectRef.current = containerRect;
        if (containerRect) {
            const maxW = Math.round(containerRect.right - rect.left);
            const maxH = Math.round(containerRect.bottom - rect.top);

            setDimensions({
                width: Math.max(
                    MIN_WIDTH,
                    Math.min(rect.width, maxW, MAX_WIDTH),
                ),
                height: Math.max(
                    MIN_HEIGHT,
                    Math.min(rect.height, maxH, MAX_HEIGHT),
                ),
            });
            const clampedLeft = Math.max(
                Math.round(containerRect.left),
                Math.round(rect.left),
            );
            const clampedTop = Math.max(
                Math.round(containerRect.top),
                Math.round(rect.top),
            );
            setPosition({ left: clampedLeft, top: clampedTop });
        } else {
            setDimensions({
                width: Math.max(MIN_WIDTH, Math.min(rect.width, MAX_WIDTH)),
                height: Math.max(MIN_HEIGHT, Math.min(rect.height, MAX_HEIGHT)),
            });
            setPosition({ left: rect.left, top: rect.top });
        }
    }, []);

    const handleResizeStart = (
        e: React.MouseEvent,
        dir: "left" | "right" | "corner" | "bottom",
    ) => {
        e.preventDefault();
        e.stopPropagation();
        if (!component.current) return;

        const container = document.querySelector(
            ".apps-container",
        ) as HTMLElement | null;
        containerRectRef.current = container?.getBoundingClientRect() || null;

        setIsResizing(true);
        setResizeDir(dir);
        startPosRef.current = { x: e.clientX, y: e.clientY };

        startRectRef.current = component.current.getBoundingClientRect();
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            const startRect = startRectRef.current;
            const containerRect = containerRectRef.current;
            if (!startRect || !resizeDir) return;
            const dx = e.clientX - startPosRef.current.x;
            const dy = e.clientY - startPosRef.current.y;

            const containerLeft = containerRect ? containerRect.left : 0;
            const containerTop = containerRect ? containerRect.top : 0;
            const containerRight = containerRect
                ? containerRect.right
                : window.innerWidth;
            const containerBottom = containerRect
                ? containerRect.bottom
                : window.innerHeight;

            if (resizeDir === "right") {
                const maxWFromContainer = Math.round(
                    containerRight - startRect.left,
                );
                const allowedMaxW = Math.min(MAX_WIDTH, maxWFromContainer);
                const proposedW = Math.round(startRect.width + dx);
                const newW = Math.max(
                    MIN_WIDTH,
                    Math.min(proposedW, allowedMaxW),
                );
                setDimensions((prev) => ({ ...prev, width: newW }));
            } else if (resizeDir === "bottom") {
                const maxHFromContainer = Math.round(
                    containerBottom - startRect.top,
                );
                const allowedMaxH = Math.min(MAX_HEIGHT, maxHFromContainer);
                const proposedH = Math.round(startRect.height + dy);
                const newH = Math.max(
                    MIN_HEIGHT,
                    Math.min(proposedH, allowedMaxH),
                );
                setDimensions((prev) => ({ ...prev, height: newH }));
            } else if (resizeDir === "left") {
                const maxWFromContainerLeft = Math.round(
                    startRect.right - containerLeft,
                );
                const allowedMaxWLeft = Math.min(
                    MAX_WIDTH,
                    maxWFromContainerLeft,
                );
                const proposedW = Math.round(startRect.width - dx);
                const newW = Math.max(
                    MIN_WIDTH,
                    Math.min(proposedW, allowedMaxWLeft),
                );
                const newLeft = Math.round(startRect.right - newW);
                setDimensions((prev) => ({ ...prev, width: newW }));
                setPosition((prev) => ({
                    ...prev,
                    left: Math.max(newLeft, Math.round(containerLeft)),
                }));
            } else if (resizeDir === "corner") {
                const maxWFromContainer = Math.round(
                    containerRight - startRect.left,
                );
                const maxHFromContainer = Math.round(
                    containerBottom - startRect.top,
                );
                const allowedMaxW = Math.min(MAX_WIDTH, maxWFromContainer);
                const allowedMaxH = Math.min(MAX_HEIGHT, maxHFromContainer);
                const newW = Math.max(
                    MIN_WIDTH,
                    Math.min(Math.round(startRect.width + dx), allowedMaxW),
                );
                const newH = Math.max(
                    MIN_HEIGHT,
                    Math.min(Math.round(startRect.height + dy), allowedMaxH),
                );
                setDimensions({ width: newW, height: newH });
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setResizeDir(null);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, resizeDir]);

    return (
        <div
            className={`app app-${type} app-id-${uniqueKey} app-i- ${isVisible ? "active" : ""}`}
            ref={component}
            onMouseDown={() => onMouseDown(component)}
            style={{
                position: "absolute",
                left: `${position.left}px`,
                top: `${position.top}px`,
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
            }}
        >
            <div className={`app-header app-${type}-header`}>
                <Controls
                    onClose={() => {
                        setVisibility(false);
                        updateState(0);
                    }}
                    onMinimise={() => {
                        setVisibility(false);
                        updateState(1);
                    }}
                    onFullScreen={
                        ACCEPTED_FULLSCREEN_APP_TYPES.includes(type)
                            ? () => {
                                  openFullscreen(bodyRef.current);
                              }
                            : undefined
                    }
                />
                <div
                    className={`app-header-name app-${type}-header-name unselectable`}
                >
                    {label}
                </div>
            </div>
            <div
                className={`app-body app-${type}-body app-id-${uniqueKey}-body`}
                ref={bodyRef}
            >
                {children}
            </div>

            {resizable && (
                <>
                    <div
                        className="app-resize-handle app-resize-handle-left"
                        onMouseDown={(e) => handleResizeStart(e, "left")}
                        style={{ cursor: "ew-resize" }}
                    />
                    <div
                        className="app-resize-handle app-resize-handle-right"
                        onMouseDown={(e) => handleResizeStart(e, "right")}
                        style={{ cursor: "ew-resize" }}
                    />
                    <div
                        className="app-resize-handle app-resize-handle-bottom"
                        onMouseDown={(e) => handleResizeStart(e, "bottom")}
                        style={{ cursor: "ns-resize" }}
                    />
                    <div
                        className="app-resize-handle app-resize-handle-corner"
                        onMouseDown={(e) => handleResizeStart(e, "corner")}
                        style={{ cursor: "nwse-resize" }}
                    />
                </>
            )}
        </div>
    );
};
