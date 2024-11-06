import { useEffect, useState } from "react";
import Node from "../config/Node";
import {
    initContext,
    initNodesWidth,
    repositionNodes,
    resizeNodeWidth,
} from "../utils/graphUtils";

const useTreeGraph = (selectedNode) => {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

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

        setNodes([...newNodes]);
        setLinks([...newLinks]);
    };

    return { nodes, links, addChildNode, setNodes };
};

export default useTreeGraph;
