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

        draggableInstance.current = Draggable.create(element, {
            type: "x,y",
            edgeResistance: 0.65,
            throwProps: true,
            onDragStart: function () {},
            onDrag: function () {},
            onDragEnd: function () {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const rect = element.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;

                const deltaX = centerX - elementCenterX;
                const deltaY = centerY - elementCenterY;

                gsap.to(element, {
                    x: `+=${deltaX}`,
                    y: `+=${deltaY}`,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)",
                    overwrite: true,
                });
            },
        });

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
