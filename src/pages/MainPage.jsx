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
import Reset from "../assets/svg/reset.svg?react";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
context.font = "15px 'Gothic A1'"; // 텍스트 크기와 스타일을 설정
context.fontWeight = "600";
context.letterSpacing = "-1.0px";
context.lineHeight = 1.3;

const MainPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [userState, setUserState] = useRecoilState(UserAtom);
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
            setTimeout(() => {
                setIsReady(true);
            }, 100);
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

    const handleReset = () => {
        localStorage.removeItem("nodes");
        localStorage.removeItem("links");
        window.location.reload();
    };

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
            <IndexBar nodes={nodes} setNodes={setNodes} />
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
            <ResetButton onClick={() => handleReset()}>
                <Reset />
            </ResetButton>
        </div>
    ) : (
        <Loading />
    );
};

export default MainPage;

const ResetButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;

    border-radius: 10px;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 10px;

    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(5px);
    svg {
        transition: transform 0.3s;
    }

    cursor: pointer;

    // hover 시 svg 180도 회전
    &:hover {
        // 누르는 효과
        transform: scale(0.9);
        svg {
            transform: rotate(180deg);
        }
    }
`;

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
