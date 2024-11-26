import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";
import add from "../../assets/svg/add.svg";
import { useState } from "react";

const AddNodeButton = ({
    node,
    addChildNode,
    setSelectedNode,
    setMemoedNode,
}) => {
    const [addImage] = useImage(add);
    const [isGenerating, setIsGenerating] = useState(false);
    return (
        <Group
            id="selected"
            onClick={async () => {
                if (!isGenerating) {
                    setIsGenerating(true); // 버튼 중복 클릭 방지
                    const success = await addChildNode(node); // 비동기 작업 대기
                    setIsGenerating(!success); // 성공 여부에 따라 상태 업데이트
                }
            }}
            onMouseEnter={(e) => {
                e.target.getStage().container().style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
                e.target.getStage().container().style.cursor = "default";
            }}
        >
            {!isGenerating && (
                <Image
                    x={node.x + node.width + 10}
                    y={node.y + node.height / 2 - 6}
                    image={addImage}
                    width={12}
                    height={12}
                />
            )}
            <Text
                x={node.x + node.width + 27}
                y={node.y + node.height / 2 - 7}
                text={isGenerating ? "생성 중..." : "명제 추가 생성"}
                fontSize={12}
                fontFamily="Gothic A1"
                fontStyle="600"
                lineHeight={1.3}
                letterSpacing={-1.0}
                fill="#1D4ED8"
                verticalAlign="middle"
            />
            <Rect
                x={node.x + node.width + 10}
                y={node.y + node.height / 2 - 6}
                width={90}
                height={12}
                fill="transparent"
                onClick={(e) => {
                    setSelectedNode(node);
                    setMemoedNode(null);
                    e.target.getStage().container().style.cursor = "default";
                }}
            />
        </Group>
    );
};

export default AddNodeButton;
