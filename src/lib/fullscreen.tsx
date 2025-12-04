interface FullscreenElement extends HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
}

export const openFullscreen = (elem: FullscreenElement | null) => {
    if (!elem) return

    if (elem.requestFullscreen)
        elem.requestFullscreen();
};
