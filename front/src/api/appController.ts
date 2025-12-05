type AppState = 0 | 1 | 2;

interface AppController {
    updateAppState: ((id: string, state: AppState) => void) | null;
}

const appController: AppController = {
    updateAppState: null,
};

export const initAppController = (
    updateFn: (id: string, state: AppState) => void,
) => {
    appController.updateAppState = updateFn;
};

export const openApp = (appId: string): boolean => {
    if (!appController.updateAppState) {
        return false;
    }
    appController.updateAppState(appId, 2);
    return true;
};

export const closeApp = (appId: string): boolean => {
    if (!appController.updateAppState) {
        return false;
    }
    appController.updateAppState(appId, 0);
    return true;
};

export const minimizeApp = (appId: string): boolean => {
    if (!appController.updateAppState) {
        return false;
    }
    appController.updateAppState(appId, 1);
    return true;
};

export const toggleApp = (appId: string, currentState: AppState): boolean => {
    if (!appController.updateAppState) {
        return false;
    }

    const newState = currentState === 2 ? 1 : 2;
    appController.updateAppState(appId, newState);
    return true;
};

interface WindowWithAppController extends Window {
    appController: {
        openApp: typeof openApp;
        closeApp: typeof closeApp;
        minimizeApp: typeof minimizeApp;
        toggleApp: typeof toggleApp;
    };
}

if (typeof window !== "undefined") {
    (window as unknown as WindowWithAppController).appController = {
        openApp,
        closeApp,
        minimizeApp,
        toggleApp,
    };
}

export default {
    initAppController,
    openApp,
    closeApp,
    minimizeApp,
    toggleApp,
};
