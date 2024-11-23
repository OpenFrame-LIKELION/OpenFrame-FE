import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";

import toggleOn from "../../assets/svg/toggle-on.svg";
import toggleOff from "../../assets/svg/toggle-off.svg";
import { repositionNodes } from "../../utils/graphUtils";
import AddNodeButton from "./AddNodeButton";
import Memo from "./Memo";

const CustomNode = ({
    index,
    node,
    setHoveredNode,
    hoveredNode,
    setSelectedNode,
    setNodes,
    nodes,
    setMemoedNode,
    memoedNode,
    addChildNode,
    selectedNode,
}) => {
    const [on] = useImage(toggleOn);
    const [off] = useImage(toggleOff);

    return (
        <Group key={`node-${index}`}>
            <Group
                key={`node-content-${index}`}
                onMouseEnter={() => {
                    if (!memoedNode) {
                        setHoveredNode(node);
                        node.parent && repositionNodes(node.parent, 0, node);
                    }
                }}
                onMouseLeave={() => {
                    if (!memoedNode) {
                        setHoveredNode(null);
                        node.parent && repositionNodes(node.parent, 0, null);
                    }
                }}
            >
                <Rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={
                        node.height +
                        (hoveredNode &&
                            (node.id === hoveredNode.id
                                ? 6.5 + node.memoHeight + 10
                                : 10))
                    }
                    fill="transparent"
                />
                <Rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    fill={node.isRoot() ? "#1D4ED8" : "#FEF08A"}
                    cornerRadius={10}
                    shadowOffsetX={0}
                    shadowOffsetY={4}
                    shadowBlur={10.3}
                    shadowColor={
                        node.isRoot()
                            ? "rgba(0, 0, 0, 0.1)"
                            : "rgba(0, 0, 0, 0.05)"
                    }
                    shadowOpacity={1}
                />
                <Text
                    x={node.x + 15}
                    y={node.y}
                    text={node.text}
                    fontSize={15}
                    fontFamily="Gothic A1"
                    fontStyle="600"
                    lineHeight={1.3}
                    letterSpacing={-1.0}
                    fill={node.isRoot() ? "#FFFFFF" : "#444751"}
                    verticalAlign="middle"
                    width={node.textWidth}
                    height={node.height}
                    onClick={() => {
                        setSelectedNode(node);
                        setMemoedNode(null);
                    }}
                />
                {!node.isRoot() && (
                    <Image
                        x={node.x + node.textWidth - 4}
                        y={node.y + node.height / 2 - 7.61}
                        image={node.checked ? on : off}
                        width={15.22}
                        height={15.22}
                        onClick={() => {
                            node.checked = !node.checked;
                            setNodes([...nodes]);
                        }}
                        onMouseEnter={(e) => {
                            e.target.getStage().container().style.cursor =
                                "pointer";
                        }}
                        onMouseLeave={(e) => {
                            e.target.getStage().container().style.cursor =
                                "default";
                        }}
                    />
                )}
                {(hoveredNode === node || node.isRoot()) && (
                    <Memo
                        index={index}
                        node={node}
                        setMemoedNode={setMemoedNode}
                        memoedNode={memoedNode}
                    />
                )}
            </Group>
            {node === selectedNode && node.children.length === 0 && (
                <AddNodeButton
                    node={node}
                    addChildNode={addChildNode}
                    setSelectedNode={setSelectedNode}
                    setMemoedNode={setMemoedNode}
                />
            )}
        </Group>
    );
};

export default CustomNode;
