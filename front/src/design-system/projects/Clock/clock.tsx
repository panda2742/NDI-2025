import { useState, useEffect } from "react";
import "./style.scss";

export const ClockProject = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const secondAngle = (seconds / 60) * 360;
    const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    const formatTime = (num: number) => num.toString().padStart(2, "0");
    const digitalTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    const days = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];
    const months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];

    const dayName = days[time.getDay()];
    const monthName = months[time.getMonth()];
    const date = time.getDate();
    const year = time.getFullYear();

    return (
        <div className="clock-container">
            <div className="clock-wrapper">
                <div className="clock-header">
                    <div className="clock-date">
                        <div className="clock-day">{dayName}</div>
                        <div className="clock-full-date">
                            {date} {monthName} {year}
                        </div>
                    </div>
                </div>

                <div className="analog-clock">
                    <div className="clock-center" />
                    <div
                        className="clock-hand clock-hand-hour"
                        style={{
                            transform: `rotate(${hourAngle}deg)`,
                        }}
                    />
                    <div
                        className="clock-hand clock-hand-minute"
                        style={{
                            transform: `rotate(${minuteAngle}deg)`,
                        }}
                    />
                    <div
                        className="clock-hand clock-hand-second"
                        style={{
                            transform: `rotate(${secondAngle}deg)`,
                        }}
                    />
                </div>

                <div className="digital-time">{digitalTime}</div>
            </div>
        </div>
    );
};
