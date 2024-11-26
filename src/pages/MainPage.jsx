import { useEffect, useState } from "react";
import { LogoIcon } from "../assets/icon/Icons";
import IndexBar from "../components/Common/IndexBar";
import SearchBar from "../components/Common/SearchBar";
import TreeGraph from "../components/Graph/TreeGraph";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useTreeGraph from "../hooks/useTreeGraph";
import Loading from "../components/Common/Loading";
import { UserAtom } from "../shared/recoil/UserAtom";
import useZoomAndPan from "../hooks/useZoomAndPan";
import { debounce } from "lodash";
import { initNodesWidth, resizeNodeWidth } from "../utils/graphUtils";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
context.font = "15px 'Gothic A1'"; // 텍스트 크기와 스타일을 설정
context.fontWeight = "600";
context.letterSpacing = "-1.0px";
context.lineHeight = 1.3;

const MainPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [userState] = useRecoilState(UserAtom);
    const navigate = useNavigate();
    const { nodes, links, nodeLoaded, addChildNode, setNodes } = useTreeGraph(
        selectedNode,
        context
    );
    const { stageRef, scale, position, handleWheel, handleFocusNode } =
        useZoomAndPan();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!userState.isLogin) {
            navigate("/login");
        }
    }, [userState.isLogin, navigate]);

    useEffect(() => {
        if (nodeLoaded) {
            handleFocusNode(nodes[0]);
            setIsReady(true);
        }
    }, [nodeLoaded]);

    const handleResize = debounce(() => {
        stageRef.current.width(window.innerWidth);
        stageRef.current.height(window.innerHeight);
    }, 200);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return nodeLoaded ? (
        <div>
            <Logo>
                <LogoIcon color="#1D4ED8" />
                <SearchBar
                    nodes={nodes}
                    setSelectedNode={setSelectedNode}
                    handleFocusNode={handleFocusNode}
                />
            </Logo>
            <IndexBar
                selectedNodeId={selectedNode ? selectedNode.id : null}
                nodes={nodes}
                setNodes={setNodes}
            />
            <TreeGraph
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                nodes={nodes}
                links={links}
                addChildNode={addChildNode}
                setNodes={setNodes}
                stageRef={stageRef}
                scale={scale}
                position={position}
                handleWheel={handleWheel}
                handleFocusNode={handleFocusNode}
                context={context}
                isReady={isReady}
            />
        </div>
    ) : (
        <Loading />
    );
};

export default MainPage;

const Logo = styled.div`
    position: absolute;
    top: 72px;
    left: calc(50%);
    transform: translateX(-50%);
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 17px;

    width: 100%;
`;
