import { Group, Path } from "react-konva";

const NodeLine = ({ index, startX, startY, endX, endY }) => {
    return (
        <Group key={`line ${index}`}>
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
};

export default NodeLine;
