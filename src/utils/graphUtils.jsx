import CustomNode from "../components/Graph/CustomNode";
import NodeLine from "../components/Graph/NodeLine";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const initContext = () => {
    context.font = "15px 'Gothic A1'"; // 텍스트 크기와 스타일을 설정
    context.fontWeight = "600";
    context.letterSpacing = "-1.0px";
    context.lineHeight = 1.3;
};

const calculateNodeSize = (node, hoveredNode) => {
    let childrenHeight = 0;
    let maxWidth = -1;

    if (!node.children || node.children.length === 0) {
        node.childrenHeight = node.height || 0;
        return false;
    }

    for (let j = 0; j < node.children.length; j++) {
        const child = node.children[j];
        const isHovered = (hoveredNode && hoveredNode.id === child.id) || false;
        const childChildrenHeight = child.childrenHeight || 0;
        const childHeight = child.height + (isHovered ? child.memoHeight : 0);

        if (childChildrenHeight > childHeight) {
            childrenHeight += childChildrenHeight;
        } else {
            childrenHeight += childHeight;
        }
        maxWidth = Math.max(maxWidth, child.width || 0);
    }

    node.childrenWidth = maxWidth;
    childrenHeight += 10 * (node.children.length - 1);

    if (node.childrenHeight !== childrenHeight) {
        node.childrenHeight = childrenHeight;
        return true;
    } else {
        return false;
    }
};

const repositionNodes = (node, diffX = 0, hoveredNode) => {
    if (!node) return;
    if (!node.children || node.children.length === 0) return;
    if (calculateNodeSize(node, hoveredNode)) {
        if (node.parent) {
            repositionNodes(node.parent, diffX, hoveredNode);
        }
    }

    node.childPosition = node.y + node.height / 2 - node.childrenHeight / 2;

    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const isHovered = (hoveredNode && hoveredNode.id === child.id) || false;
        const childHeight =
            child.height + (isHovered ? child.memoHeight + 4 : 0);
        child.x = node.x + node.width + 64;
        let diffY;
        if (child.childrenHeight > childHeight) {
            diffY = child.y;
            child.y =
                node.childPosition + child.childrenHeight / 2 - childHeight / 2;
            diffY -= child.y;
            node.childPosition += child.childrenHeight + 10;
        } else {
            diffY = child.y;
            child.y = node.childPosition;
            diffY -= child.y;
            node.childPosition += childHeight + 10;
        }
        moveChildren(child, diffX, -diffY);
    }
};

const moveChildren = (node, dx, dy) => {
    if (!node.children || node.children.length === 0) return;
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        child.x += dx;
        child.y += dy;
        moveChildren(child, dx, dy);
    }
};

const resizeNodeWidth = (node) => {
    const maxWidth = node.isRoot() ? 400 : 377;
    node.textWidth = context.measureText(node.text).width + 30;
    if (node.textWidth > maxWidth) {
        let lines = Math.ceil(node.textWidth / maxWidth);
        node.textWidth = node.isRoot() ? maxWidth - 15 : maxWidth;
        node.height =
            Math.floor(
                context.measureText(node.text).actualBoundingBoxAscent * lines
            ) + 50;
    } else {
        node.height = 50;
    }
    node.width = node.isRoot() ? node.textWidth : node.textWidth + 23;
};

const initNodesWidth = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
        resizeNodeWidth(nodes[i]);
    }
};

const connectNodes = ({ links, hoveredNode }) => {
    return links.map((link, i) => {
        const parent = link.source;
        const child = link.target;
        const isHovered = (hoveredNode && hoveredNode.id === child.id) || false;

        if (!parent || !child) return null; // Ensure both nodes exist
        if (child !== parent.children[0] && child !== parent.lastChild()) {
            return null;
        }

        // Calculate start and end points for the path
        const startX = parent.x + parent.width + 10;
        const startY = parent.y + parent.height / 2;
        const endX = child.x - 10;
        const endY =
            child === parent.lastChild()
                ? child.y + child.height + (isHovered ? child.memoHeight : 0)
                : child.y;

        return (
            <NodeLine
                key={`link-${i}`}
                index={i}
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
            />
        );
    });
};

const printNodes = ({
    nodes,
    hoveredNode,
    memoedNode,
    selectedNode,
    setNodes,
    setHoveredNode,
    setMemoedNode,
    setSelectedNode,
    addChildNode,
}) => {
    return nodes.map((node, i) => (
        <CustomNode
            key={`node-${i}`}
            index={i}
            node={node}
            setHoveredNode={setHoveredNode}
            hoveredNode={hoveredNode}
            setSelectedNode={setSelectedNode}
            setNodes={setNodes}
            nodes={nodes}
            setMemoedNode={setMemoedNode}
            memoedNode={memoedNode}
            addChildNode={addChildNode}
            selectedNode={selectedNode}
        />
    ));
};

export {
    calculateNodeSize,
    repositionNodes,
    moveChildren,
    initNodesWidth,
    resizeNodeWidth,
    initContext,
    connectNodes,
    printNodes,
};
