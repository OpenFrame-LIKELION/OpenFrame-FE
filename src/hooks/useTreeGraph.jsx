import { useEffect, useState } from "react";
import Node from "../config/Node";
import {
    deserializeLinks,
    deserializeNodes,
    initNodesWidth,
    repositionNodes,
    resizeNodeWidth,
    serializeLinks,
    serializeNodes,
} from "../utils/graphUtils";
import { getChats } from "../apis/chatApi";

const useTreeGraph = (selectedNode, context) => {
    const [nodes, setNodes] = useState([]);
    const [nodeLoaded, setNodeLoaded] = useState(false);
    const [links, setLinks] = useState([]);
    const [draw, setDraw] = useState(false);

    useEffect(() => {
        if (nodes.length > 0 && nodeLoaded) {
            serializeNodes(nodes).then((nodes) => {
                localStorage.setItem("nodes", JSON.stringify(nodes));
            });
            serializeLinks(links).then((links) => {
                localStorage.setItem("links", JSON.stringify(links));
            });
        }
    }, [nodes, links, nodeLoaded]);

    useEffect(() => {
        const parent = new Node(1, "", 0, 0, 0, 0, null, []);
        resizeNodeWidth(parent, context);

        setTimeout(() => {
            setDraw(true);
        }, 1000);
    }, []);

    useEffect(() => {
        const initiallize = async () => {
            if (draw) {
                const nodes = [];
                const links = [];
                let parent = null;
                const storedNodes = JSON.parse(localStorage.getItem("nodes"));
                const storedLinks = JSON.parse(localStorage.getItem("links"));

                if (storedNodes) {
                    await deserializeNodes(storedNodes).then((rootNodes) => {
                        nodes.push(...rootNodes);
                    });
                    await deserializeLinks(nodes, storedLinks).then(
                        (deserializedLinks) => {
                            links.push(...deserializedLinks);
                        }
                    );
                } else {
                    parent = new Node(
                        1,
                        "반응형 주제 문장",
                        100,
                        305,
                        0,
                        0,
                        null,
                        []
                    );
                    nodes.push(parent);
                }

                initNodesWidth(nodes, context);

                for (const node of nodes) {
                    repositionNodes(node, 0, null);
                }

                setNodes(nodes);
                setLinks(links);
                setNodeLoaded(true);
            }
        };
        initiallize();
    }, [draw]);

    const addChildNode = async (node) => {
        if (!selectedNode) return;

        const newNodes = [...nodes];
        const newLinks = [...links];

        const newTexts = await getChats(node.text);

        let index = 1;
        for (const text of newTexts) {
            const newChild = new Node(
                newNodes.length + 1,
                text.response,
                selectedNode.x + selectedNode.width + 20,
                selectedNode.y + selectedNode.height + 20 * index,
                100,
                50,
                selectedNode,
                []
            );

            resizeNodeWidth(newChild, context);
            selectedNode.addChild(newChild);

            newNodes.push(newChild);
            newLinks.push({ source: selectedNode, target: newChild });

            index++;
        }

        repositionNodes(selectedNode, 0, null);

        setNodes([...newNodes]);
        setLinks([...newLinks]);

        return true;
    };

    return { nodes, links, nodeLoaded, addChildNode, setNodes };
};

export default useTreeGraph;
