import { Group, Image, Rect, Text } from "react-konva";
import addWhite from "../../assets/svg/add-white.svg";
import useImage from "use-image";

const Memo = ({ index, node, memoedNode, setMemoedNode }) => {
    const [addWhiteImage] = useImage(addWhite);
    return (
        <Group
            id={`children-memo ${index}`}
            onClick={(e) => {
                setMemoedNode(node);
                e.target.getStage().container().style.cursor = "text";
            }}
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
            {memoedNode !== node && (
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
