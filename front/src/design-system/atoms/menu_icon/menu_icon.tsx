import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import "./style.scss";

const DateDisplay = () => {
    const formatDate = (): string => {
        const date = new Date();
        let formattedDate = format(date, "MMM d HH:mm", { locale: fr });
        formattedDate = formattedDate.replace(".", "");
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    const [date, setDate] = useState<string>(formatDate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(formatDate());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div className="window-menu-icon-date unselectable">{date}</div>;
};

const ActivityDisplay = () => {
    return <div className="window-menu-icon-date unselectable">Activités</div>;
};

const Icons = {
    wifi: () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.003 2c-2.61 0-5.22.838-7.4 2.518l-.266.205.205.263 7.457 9.672 7.668-9.931-.264-.206a12.105 12.105 0 0 0-7.4-2.521z"
                fill="gray"
            />
        </svg>
    ),
    sound: () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="currentColor">
                <path d="M8 1L4.5 5H1.87S1 5.893 1 8c0 2.109 0.87 2.999 0.87 2.999h2.63l3.5 4z" />
                <path d="M10.524 4.926l-.707.707.354.354a2.999 2.999 0 0 1 0 4.242l-.354.353.707.707.354-.353a4 4 0 0 0 0-5.656z" />
                <path d="M12.645 2.805l-.707.707.354.353a5.999 5.999 0 0 1 0 8.485l-.354.353.707.707.354-.353a7 7 0 0 0 0-9.899z" />
            </g>
        </svg>
    ),
    logout: () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-92 -320)" fill="currentColor">
                <path d="m92 321v14h11v-5h-1v4h-9v-12h9v5h1v-6z" />
                <path d="m107.08 328h-8.002v-2c-0.76042 0.34766-1.5341 0.73627-2.3223 1.166-0.78078 0.43079-1.5348 0.8757-2.2598 1.334 0.725 0.44911 1.479 0.88953 2.2598 1.3203 0.78862 0.42999 1.5634 0.82276 2.3242 1.1797v-2h8z" />
            </g>
        </svg>
    ),
    date: DateDisplay,
    activity: ActivityDisplay,
};

export interface MenuProps {
    type: "wifi" | "sound" | "date" | "logout" | "activity";
}

export const MenuIcon = ({ type }: MenuProps) => {
    return <div className={`window_menu_icon`}> {Icons[type]()} </div>;
};
