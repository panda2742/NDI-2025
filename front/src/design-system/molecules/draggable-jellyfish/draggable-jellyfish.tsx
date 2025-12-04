import { useEffect, useRef } from "react";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import "./style.scss";

interface DraggableJellyfishProps {
    src: string;
    alt?: string;
}

export const DraggableJellyfish = ({
    src,
    alt = "jellyfish",
}: DraggableJellyfishProps) => {
    const jellyfishRef = useRef<HTMLImageElement | null>(null);
    const draggableInstance = useRef<Draggable[] | null>(null);

    useEffect(() => {
        if (!jellyfishRef.current) return;

        const element = jellyfishRef.current;

        console.log("🐙 Initializing draggable jellyfish...");

        // Créer l'instance Draggable avec effet élastique
        draggableInstance.current = Draggable.create(element, {
            type: "x,y",
            edgeResistance: 0.65,
            throwProps: true,
            onDragStart: function () {
                console.log("🐙 Drag started!");
            },
            onDrag: function () {
                console.log("🐙 Dragging...");
            },
            onDragEnd: function () {
                console.log("🐙 Drag ended, returning to center...");

                // Calculer le centre de l'écran
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                // Obtenir la position actuelle de l'élément
                const rect = element.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;

                // Calculer le déplacement nécessaire pour revenir au centre
                const deltaX = centerX - elementCenterX;
                const deltaY = centerY - elementCenterY;

                // Animer le retour au centre avec effet élastique (elastic)
                gsap.to(element, {
                    x: `+=${deltaX}`,
                    y: `+=${deltaY}`,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)",
                    overwrite: true,
                });
            },
        });

        console.log(
            "🐙 Draggable instance created:",
            draggableInstance.current,
        );

        // Cleanup lors du démontage
        return () => {
            if (draggableInstance.current) {
                draggableInstance.current.forEach((instance) =>
                    instance.kill(),
                );
            }
        };
    }, []);

    return (
        <img
            ref={jellyfishRef}
            src={src}
            alt={alt}
            className="draggable-jellyfish"
        />
    );
};
