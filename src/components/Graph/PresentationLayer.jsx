import { Layer } from "react-konva";
import { connectNodes, printNodes } from "../../utils/graphUtils";

const PresentationLayer = ({
    nodes,
    links,
    hoveredNode,
    memoedNode,
    selectedNode,
    setNodes,
    setHoveredNode,
    setMemoedNode,
    setSelectedNode,
    addChildNode,
}) => {
    return (
        <Layer>
            {connectNodes({ links, hoveredNode })}
            {printNodes({
                nodes,
                hoveredNode,
                memoedNode,
                selectedNode,
                setNodes,
                setHoveredNode,
                setMemoedNode,
                setSelectedNode,
                addChildNode,
            })}
        </Layer>
    );
};

export default PresentationLayer;
