import { useState } from "react";
import { LogoIcon } from "../assets/icon/Icons";
import IndexBar from "../components/Common/IndexBar";
import SearchBar from "../components/Common/SearchBar";
import TreeGraph from "../components/Graph/TreeGraph";
import styled from "styled-components";

const MainPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    return (
        <>
            <Logo>
                <LogoIcon color="#1D4ED8" />
                <SearchBar />
            </Logo>
            <IndexBar selectedNodeId={selectedNode ? selectedNode.id : null} />
            <TreeGraph
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
            />
        </>
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
