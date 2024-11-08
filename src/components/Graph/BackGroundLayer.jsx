import { Layer, Rect } from "react-konva";

const BackGroundLayer = ({ setSelectedNode, setMemoedNode }) => {
    return (
        <Layer>
            <Rect
                x={0}
                y={0}
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={() => {
                    setSelectedNode(null);
                    setMemoedNode(null);
                }}
            />
        </Layer>
    );
};

export default BackGroundLayer;
