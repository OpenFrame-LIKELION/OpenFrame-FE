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

    const handleFocusNode = (node) => {
        const stage = stageRef.current; // 현재 스테이지 참조
        const newScale = 1.5; // 새로운 스케일 설정

        // 스테이지의 너비와 높이 가져오기
        const stageWidth = window.innerWidth;
        const stageHeight = window.innerHeight;

        // 새로운 스케일에 따른 중심 좌표 계산
        const x =
            -node.x * newScale + stageWidth / 2 - (node.width * newScale) / 2;
        const y =
            -node.y * newScale + stageHeight / 2 - (node.height * newScale) / 2;

        // 스케일과 위치 업데이트
        setScale(newScale);
        setPosition({
            x: x,
            y: y,
        });
    };

    return { stageRef, scale, position, handleWheel, handleFocusNode };
}

export default useZoomAndPan;
