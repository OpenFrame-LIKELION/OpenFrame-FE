import React, { useEffect, useState } from "react";
import TreeGraph from "./components/Graph/TreeGraph";
import styled, { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import { LogoIcon } from "./assets/icon/Icons";
import SearchBar from "./components/Common/SearchBar";
import IndexBar from "./components/Common/IndexBar";
import OnBoarding from "./components/Common/OnBoarding";

function App() {
    const [selectedNode, setSelectedNode] = useState(null);
    const [isAssetLoaded, setIsAssetLoaded] = useState(false);

    useEffect(() => {
        // 5초 대기
        setTimeout(() => {
            setIsAssetLoaded(true);
        }, 500);
    }, []);

    return isAssetLoaded ? (
        <ThemeProvider theme={theme}>
            <Logo>
                <LogoIcon color="#1D4ED8" />
                <SearchBar />
            </Logo>
            <IndexBar selectedNodeId={selectedNode ? selectedNode.id : null} />
            <TreeGraph
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
            />
        </ThemeProvider>
    ) : (
        <OnBoarding />
    );
}

export default App;

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
