import { useState, useRef } from "react";

function useZoomAndPan() {
    const stageRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.1;
        const stage = stageRef.current;
        const oldScale = stage.scaleX();

        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const direction = e.evt.deltaY < 0 ? 1 : -1;
        const newScale =
            direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        setScale(newScale);
        setPosition({
            x:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
                newScale,
            y:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
                newScale,
        });
    };

    return { stageRef, scale, position, handleWheel };
}

export default useZoomAndPan;
