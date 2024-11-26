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
    context,
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
                context,
            })}
        </Layer>
    );
};

export default PresentationLayer;
