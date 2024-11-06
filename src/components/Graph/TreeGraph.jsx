import { useEffect, useRef, useState } from "react";
import { Group, Image, Layer, Path, Rect, Stage, Text } from "react-konva";
import useImage from "use-image";
import add from "../../assets/svg/add.svg";
import addWhite from "../../assets/svg/add-white.svg";
import toggleOn from "../../assets/svg/toggle-on.svg";
import toggleOff from "../../assets/svg/toggle-off.svg";
import {
    initContext,
    initNodesWidth,
    repositionNodes,
    resizeNodeWidth,
} from "../../utils/graphUtils";
import Node from "../../config/Node";

function TreeGraph({ selectedNode, setSelectedNode }) {
    const stageRef = useRef(null);
    const [addImage] = useImage(add);
    const [addWhiteImage] = useImage(addWhite);
    const [on] = useImage(toggleOn);
    const [off] = useImage(toggleOff);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [hoveredNode, setHoveredNode] = useState(null);

    useEffect(() => {
        const parent = new Node(
            1,
            "반응형 주제 문장",
            100,
            305,
            133,
            50,
            null,
            []
        );
        const initialNodes = [parent];
        const initialLinks = [];
        initContext();
        initNodesWidth(initialNodes);
        setNodes(initialNodes);
        setLinks(initialLinks);
    }, []);

    // Function to add a new child node to the selected node
    const addChildNode = (count = 5) => {
        if (!selectedNode) return;

        const newNodes = [...nodes];
        const newLinks = [...links];

        for (let i = 0; i < count; i++) {
            const newChild = new Node(
                newNodes.length + 1,
                `관련/중립/반대 문장 ${i + 1}`,
                selectedNode.x + selectedNode.width + 20,
                selectedNode.y + selectedNode.height + 20 * (i + 1),
                100,
                50,
                selectedNode,
                []
            );

            resizeNodeWidth(newChild);
            selectedNode.addChild(newChild);

            newNodes.push(newChild);
            newLinks.push({ source: selectedNode, target: newChild });
        }

        repositionNodes(selectedNode, 0, null);

        setNodes([...newNodes]); // 상태 업데이트
        setLinks([...newLinks]);
    };

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

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onWheel={handleWheel}
            ref={stageRef}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            draggable
            style={{
                background: "#F4F8FD",
                backgroundImage: "radial-gradient(#D9D9D9 10%, transparent 0)",
                backgroundPosition: "0 0, 10px 10px",
                backgroundSize: "20px 20px",
            }}
            onDragStart={(e) => {}}
            onDragEnd={(e) => {}}
        >
            <Layer>
                {links.map((link, i) => {
                    const parent = link.source;
                    const child = link.target;
                    const isHovered =
                        (hoveredNode && hoveredNode.id === child.id) || false;

                    if (!parent || !child) return null; // Ensure both nodes exist
                    if (
                        child !== parent.children[0] &&
                        child !== parent.lastChild()
                    ) {
                        return null;
                    }

                    // Calculate start and end points for the path
                    const startX = parent.x + parent.width + 10;
                    const startY = parent.y + parent.height / 2;
                    const endX = child.x - 10;
                    const endY =
                        child === parent.lastChild()
                            ? child.y +
                              child.height +
                              (isHovered ? child.memoHeight : 0)
                            : child.y;

                    return (
                        <Group key={`line ${i}`}>
                            {/* Draw path from parent to child */}
                            <Path
                                data={`M ${startX} ${startY} H ${
                                    startX + 30
                                } V ${endY} H ${endX}`}
                                stroke="#BFC6DD"
                                strokeWidth={2}
                            />
                        </Group>
                    );
                })}
                {nodes.map((node, i) => (
                    <Group key={`node-${i}`}>
                        <Group
                            key={`node-content-${i}`}
                            onMouseEnter={() => {
                                setHoveredNode(node);
                                node.parent &&
                                    repositionNodes(node.parent, 0, node);
                            }}
                            onMouseLeave={() => {
                                setHoveredNode(null);
                                node.parent &&
                                    repositionNodes(node.parent, 0, null);
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
                                        e.target
                                            .getStage()
                                            .container().style.cursor =
                                            "pointer";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target
                                            .getStage()
                                            .container().style.cursor =
                                            "default";
                                    }}
                                />
                            )}
                            {(hoveredNode === node || node.isRoot()) && (
                                <Group id={`children-memo ${i}`}>
                                    <Rect
                                        width={node.memoWidth + 15}
                                        height={node.memoHeight}
                                        x={node.x}
                                        y={node.y + node.height + 6.5}
                                        fill="#ffffff"
                                        cornerRadius={[0, 10, 10, 10]}
                                        stroke="#BFC6DD"
                                        strokeWidth={1}
                                        shadowOffsetX={0}
                                        shadowOffsetY={4}
                                        shadowBlur={10.3}
                                        shadowColor="rgba(0, 0, 0, 0.1)"
                                        shadowOpacity={1}
                                    />
                                    <Text
                                        x={node.x + 13}
                                        y={node.y + node.height + 6.5}
                                        width={node.memoWidth}
                                        height={node.memoHeight}
                                        text="메모 추가"
                                        fontSize={12}
                                        fontFamily="Gothic A1"
                                        fontStyle="600"
                                        lineHeight={1.3}
                                        letterSpacing={-1.0}
                                        fill="#BFC6DD"
                                        verticalAlign="middle"
                                    />
                                    <Image
                                        x={node.x + node.memoWidth - 8}
                                        y={node.y + node.height + 10 + 8}
                                        image={addWhiteImage}
                                        width={12}
                                        height={12}
                                    />
                                </Group>
                            )}
                        </Group>
                        {node === selectedNode &&
                            node.children.length === 0 && (
                                <Group
                                    id="selected"
                                    onClick={() => {
                                        addChildNode();
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target
                                            .getStage()
                                            .container().style.cursor =
                                            "pointer";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target
                                            .getStage()
                                            .container().style.cursor =
                                            "default";
                                    }}
                                >
                                    <Image
                                        x={node.x + node.width + 10}
                                        y={node.y + node.height / 2 - 6}
                                        image={addImage}
                                        width={12}
                                        height={12}
                                    />
                                    <Text
                                        x={node.x + node.width + 27}
                                        y={node.y + node.height / 2 - 7}
                                        text={"명제 추가 생성"}
                                        fontSize={12}
                                        fontFamily="Gothic A1"
                                        fontStyle="600"
                                        lineHeight={1.3}
                                        letterSpacing={-1.0}
                                        fill="#1D4ED8"
                                        verticalAlign="middle"
                                        onClick={(e) => {
                                            setSelectedNode(node);
                                            e.target
                                                .getStage()
                                                .container().style.cursor =
                                                "default";
                                        }}
                                    />
                                </Group>
                            )}
                    </Group>
                ))}
            </Layer>
        </Stage>
    );
}

export default TreeGraph;
