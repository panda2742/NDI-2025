import { ReactElement } from "react";

// import { ProjectTemplate } from '@atoms/project_template/project_template.tsx';
// import { Terminal } from '@molecules/terminal/terminal.tsx';
import { NirdProject } from "@projects/Nird/nird";

import {
    Clipouille,
    SnakeProject,
    CalculatorProject,
    ClockProject,
    LeaderboardProject,
    FileExplorerProject,
    Windous,
    Snake,
} from "@projects/index.ts";
import { Terminal } from "@molecules/terminal/display/terminal";
import { PlaceholderApp } from "@molecules/placeholder-app/placeholder-app.tsx";

export interface IApp {
    label: string;
    id: string;
    content: ReactElement | null;
    iconKey:
        | "terminal"
        | "clipouille"
        | "calc"
        | "clock"
        | "leaderboard"
        | "folder"
        | "windous"
        | "leaderboard"
        | "calc"
        | "clock"
        | "snake"
        | "nird";
    state: 0 | 1 | 2;
    type: "application" | "project" | "contact";
    onClick?: () => void;
    pinnedToDock?: boolean;
    hide?: boolean;
    resizable?: boolean;
    defaultSize?: { width: number; height: number };
    defaultPosition?: { left: number; top: number };
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}

export const defaultApps: IApp[][] = [
    [
        {
            label: "Clipouille",
            id: "clipouille",
            content: <Clipouille key={"clipouille"} />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
            pinnedToDock: true,
        },
        {
            label: "Login: WinDoUS",
            id: "windous",
            content: <Windous key={"windous"} />,
            iconKey: "windous",
            state: 0,
            type: "application",
            pinnedToDock: true,
        },
        {
            label: "Terminal",
            id: "terminal",
            content: <Terminal key={"contact"} />,
            iconKey: "terminal",
            state: 0,
            type: "application",
            pinnedToDock: true,
        },
        {
            label: "Calculator",
            id: "calculator",
            content: <CalculatorProject key={"calculator"} />,
            iconKey: "calc",
            state: 0,
            type: "application",
            resizable: false,
            defaultSize: { width: 300, height: 440 },
            pinnedToDock: true,
        },
        {
            label: "Files",
            id: "files",
            content: <FileExplorerProject key={"files"} />,
            iconKey: "folder",
            state: 0,
            type: "application",
            resizable: true,
            defaultSize: { width: 600, height: 500 },
            minWidth: 450,
            minHeight: 400,
            pinnedToDock: true,
        },
        {
            label: "Nird",
            id: "nird",
            content: <NirdProject key={"nird"} />,
            iconKey: "nird",
            state: 2,
            type: "application",
            pinnedToDock: true,
            defaultSize: { width: 1720, height: 750 },
            defaultPosition: { left: 100, top: 0 },
        },
    ],
    [
        {
            label: "Clock",
            id: "clock",
            content: <ClockProject key={"clock"} />,
            iconKey: "clock",
            state: 0,
            type: "application",
            resizable: false,
            defaultSize: { width: 320, height: 380 },
        },
        {
            label: "Snake",
            id: "snake",
            content: <SnakeProject key={"snake"} />,
            iconKey: "snake",
            state: 0,
            type: "application",
            hide: true,
            resizable: false,
        },
        {
            label: "Leaderboard",
            id: "leaderboard",
            content: <LeaderboardProject key={"leaderboard"} />,
            iconKey: "leaderboard",
            state: 0,
            type: "application",
            hide: true,
            resizable: true,
        },
    ],
];
