import { useEffect } from "react";
import { useToast } from '#/lib/toast';

// import Clipouille from '../atoms/app_icon/icons/'

async function routine() {
    if (Math.random() < 0.1) {
        console.log('notification');
        const response = await fetch("/api/chatbot/notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            console.error(`Erreur HTTP! Statut: ${response.status}`);
            return;
        }
        const data = await response.json();

        if (response.status !== 200) {
            console.log(`Error notification ${data.error}`);
            return ;
        }
        console.log("notification");
        console.log(data);
        return data.text;
    }
};

const Task = () => {
    const toast = useToast();
    
        useEffect(() => {
            
            const executeRoutineAndNotify = async () => {
                const notificationText = await routine();
                
                if (notificationText) {
                    toast.success("Clipouille", notificationText, );
                }
            };
    
            const intervalId = setInterval(executeRoutineAndNotify, 1000);
    
            return () => {
                clearInterval(intervalId);
                console.log("Stoping routine");
            };
    
        }, [routine]);
    return null;
}

export {Task};