import { ReactElement } from "react";

// import { ProjectTemplate } from '@atoms/project_template/project_template.tsx';
// import { Terminal } from '@molecules/terminal/terminal.tsx';

import {
    Clipouille,
    SnakeProject,
    LeaderboardProject,
} from "@projects/index.ts";
import { Terminal } from "@molecules/terminal/display/terminal";
import { PlaceholderApp } from "@molecules/placeholder-app/placeholder-app.tsx";

export interface IApp {
    label: string;
    id: string;
    content: ReactElement | null;
    iconKey:
        | "terminal"
        | "clipouille";
    state: 0 | 1 | 2;
    type: "application" | "project" | "contact";
    onClick?: () => void;
    pinnedToDock?: boolean;
    hide?: boolean;
    resizable?: boolean;
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
            label: "Terminal",
            id: "terminal",
            content: <Terminal key={"contact"} />,
            iconKey: "terminal",
            state: 2,
            type: "application",
            pinnedToDock: true,
        },
    ],
    [
        {
            label: "Firefox",
            id: "firefox",
            content: <PlaceholderApp appName="Firefox" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "Chrome",
            id: "chrome",
            content: <PlaceholderApp appName="Chrome" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "VS Code",
            id: "vscode",
            content: <PlaceholderApp appName="VS Code" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Spotify",
            id: "spotify",
            content: <PlaceholderApp appName="Spotify" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "Discord",
            id: "discord",
            content: <PlaceholderApp appName="Discord" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Slack",
            id: "slack",
            content: <PlaceholderApp appName="Slack" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Notion",
            id: "notion",
            content: <PlaceholderApp appName="Notion" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Figma",
            id: "figma",
            content: <PlaceholderApp appName="Figma" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "Postman",
            id: "postman",
            content: <PlaceholderApp appName="Postman" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Docker",
            id: "docker",
            content: <PlaceholderApp appName="Docker" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Gimp",
            id: "gimp",
            content: <PlaceholderApp appName="Gimp" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "Blender",
            id: "blender",
            content: <PlaceholderApp appName="Blender" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "OBS Studio",
            id: "obs",
            content: <PlaceholderApp appName="OBS Studio" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "Audacity",
            id: "audacity",
            content: <PlaceholderApp appName="Audacity" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "VLC",
            id: "vlc",
            content: <PlaceholderApp appName="VLC" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "LibreOffice",
            id: "libreoffice",
            content: (
                <PlaceholderApp appName="LibreOffice" iconKey="terminal" />
            ),
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Thunderbird",
            id: "thunderbird",
            content: <PlaceholderApp appName="Thunderbird" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Files",
            id: "files",
            content: <PlaceholderApp appName="Files" iconKey="terminal" />,
            iconKey: "terminal",
            state: 0,
            type: "application",
        },
        {
            label: "Calculator",
            id: "calculator",
            content: <PlaceholderApp appName="Calculator" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "Settings",
            id: "settings",
            content: <PlaceholderApp appName="Settings" iconKey="clipouille" />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
        },
        {
            label: "Snake",
            id: "snake",
            content: <SnakeProject key={"snake"} />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
            hide: false,
            resizable: false,
        },
        {
            label: "Leaderboard",
            id: "leaderboard",
            content: <LeaderboardProject key={"leaderboard"} />,
            iconKey: "clipouille",
            state: 0,
            type: "application",
            hide: true,
            resizable: true,
        },
    ],
];
