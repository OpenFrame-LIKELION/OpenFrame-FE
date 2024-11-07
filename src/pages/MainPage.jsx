import { useEffect, useState } from "react";
import { LogoIcon } from "../assets/icon/Icons";
import IndexBar from "../components/Common/IndexBar";
import SearchBar from "../components/Common/SearchBar";
import TreeGraph from "../components/Graph/TreeGraph";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../shared/recoil/authAtom";
import OnBoarding from "../components/Common/OnBoarding";
import useTreeGraph from "../hooks/useTreeGraph";

const MainPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [login] = useRecoilState(loginState);
    const navigate = useNavigate();
    const { draw, nodes, links, addChildNode, setNodes } =
        useTreeGraph(selectedNode);

    useEffect(() => {
        if (!login) {
            navigate("/login");
        }
    }, [login, navigate]);

    return draw ? (
        <>
            <Logo>
                <LogoIcon color="#1D4ED8" />
                <SearchBar />
            </Logo>
            <IndexBar selectedNodeId={selectedNode ? selectedNode.id : null} />
            <TreeGraph
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                nodes={nodes}
                links={links}
                addChildNode={addChildNode}
                setNodes={setNodes}
            />
        </>
    ) : (
        <OnBoarding />
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
