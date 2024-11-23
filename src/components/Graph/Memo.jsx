import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";
import addWhite from "../../assets/svg/add-white.svg";
import { useState } from "react";
import { Html } from "react-konva-utils";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

context.font = "12px 'Gothic A1'"; // 텍스트 크기와 스타일을 설정
context.fontWeight = "600";
context.letterSpacing = "-1.0px";
context.lineHeight = 1.3;

const Memo = ({ index, node, memoedNode, setMemoedNode }) => {
    const [addWhiteImage] = useImage(addWhite);
    const [isEditing, setIsEditing] = useState(false);
    const [memoText, setMemoText] = useState(node.memo || "");

    const handleMemoClick = () => {
        setMemoedNode(node);
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setMemoText(e.target.value);
        resizeMemoWidth(node, e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setIsEditing(false);
            setMemoedNode(null);
            node.memo = memoText;
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        node.memo = memoText;
    };

    const resizeMemoWidth = (node, text) => {
        const maxWidth = node.width - 15;
        node.memoWidth = context.measureText(text).width + 26;
        if (node.memoWidth > maxWidth) {
            let lines = Math.ceil(node.memoWidth / maxWidth);
            node.memoWidth = maxWidth;
            node.memoHeight = Math.ceil(18 * lines + 26);
        } else {
            node.memoHeight = 35;
        }
        if (node.memoHeight < 35) {
            node.memoHeight = 35;
        }
        node.memoWidth = node.memoWidth < 72 ? 72 : node.memoWidth;
    };

    return (
        <Group
            id={`children-memo ${index}`}
            onClick={handleMemoClick}
            onMouseEnter={(e) => {
                if (memoedNode === node) {
                    e.target.getStage().container().style.cursor = "text";
                } else {
                    e.target.getStage().container().style.cursor = "pointer";
                }
            }}
            onMouseLeave={(e) => {
                e.target.getStage().container().style.cursor = "default";
            }}
        >
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
            {!isEditing ? (
                <Text
                    x={node.x + 13}
                    y={node.y + node.height + 16}
                    width={node.memoWidth - 12}
                    height={node.memoHeight}
                    text={memoText === "" ? "메모 추가" : memoText}
                    fontSize={12}
                    fontFamily="Gothic A1"
                    fontStyle="600"
                    lineHeight={1.3}
                    letterSpacing={-1.0}
                    fill={memoText === "" ? "#BFC6DD" : "#444751"}
                    wrap="char"
                />
            ) : (
                <Html
                    groupProps={{
                        x: node.x,
                        y: node.y + node.height + 6.5,
                    }}
                    divProps={{ style: { opacity: 1, pointerEvents: "auto" } }}
                >
                    <textarea
                        value={memoText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        style={{
                            width: `${node.memoWidth - 13}px`,
                            height: `${node.memoHeight - 20}px`,
                            fontSize: "12px",
                            fontFamily: "Gothic A1",
                            fontWeight: "600",
                            lineHeight: "1.3",
                            letterSpacing: "-1px",
                            color: "#444751",
                            border: "1px solid #BFC6DD",
                            borderRadius: "0 10px 10px 10px",
                            outline: "none",
                            resize: "none",
                            background: "#ffffff",
                            padding: "9px 13px",
                        }}
                        autoFocus
                    />
                </Html>
            )}
            {node.memo === "" && memoedNode !== node && (
                <Image
                    x={node.x + node.memoWidth - 8}
                    y={node.y + node.height + 10 + 8}
                    image={addWhiteImage}
                    width={12}
                    height={12}
                />
            )}
        </Group>
    );
};

export default Memo;
