import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";

import toggleOn from "../../assets/svg/toggle-on.svg";
import toggleOff from "../../assets/svg/toggle-off.svg";
import { repositionNodes, resizeNodeWidth } from "../../utils/graphUtils";
import AddNodeButton from "./AddNodeButton";
import Memo from "./Memo";
import { useEffect, useState } from "react";
import { Html } from "react-konva-utils";

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
    context,
}) => {
    const [on] = useImage(toggleOn);
    const [off] = useImage(toggleOff);

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(
        node.text === "반응형 주제 문장" ? "" : node.text
    );

    const handleNodeClick = () => {
        if (node.isRoot() && node.children.length === 0) {
            setIsEditing(true);
        }
    };

    const handleInputChange = (e) => {
        node.text = e.target.value;
        setText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        if (isEditing) {
            resizeNodeWidth(node, context);
        }
        setNodes([...nodes]);
    }, [isEditing, node.text, node.memo]);

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
                {node.memo && node !== hoveredNode && !node.isRoot() && (
                    <Rect
                        x={node.x + 3}
                        y={node.y + node.height - 15}
                        width={node.width - 3}
                        height={20}
                        fill="#d9d9d9"
                        cornerRadius={10}
                    />
                )}
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
                {!isEditing ? (
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
                            handleNodeClick();
                        }}
                    />
                ) : (
                    <Html
                        groupProps={{
                            x: node.x,
                            y: node.y,
                        }}
                        divProps={{
                            style: { opacity: 1, pointerEvents: "auto" },
                        }}
                    >
                        <div
                            style={{
                                width: `${node.width - 13}px`,
                                height: `${node.height - 28}px`,
                                background: "#1D4ED8",
                                borderRadius: "10px",
                                padding: "13px  0px 15px 13px",
                            }}
                        >
                            <textarea
                                value={text}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                style={{
                                    fontSize: "15px",
                                    fontFamily: "Gothic A1",
                                    fontWeight: "600",
                                    lineHeight: "1.3",
                                    letterSpacing: "-1.0px",
                                    color: "white",
                                    background: "transparent",
                                    outline: "none",
                                    resize: "none",
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    margin: "0",
                                    overflow: "hidden", // 스크롤바 제거
                                    wordBreak: "keep-all",
                                }}
                                autoFocus
                            />
                        </div>
                    </Html>
                )}
                {!node.isRoot() && (
                    <Image
                        x={node.x + node.width - 15.22 - 15}
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
