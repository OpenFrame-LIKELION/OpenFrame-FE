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

const MainPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [userState] = useRecoilState(UserAtom);
    const navigate = useNavigate();
    const { nodes, links, nodeLoaded, addChildNode, setNodes } =
        useTreeGraph(selectedNode);

    useEffect(() => {
        if (!userState.isLogin) {
            navigate("/login");
        }
    }, [userState.isLogin, navigate]);

    return nodeLoaded ? (
        <div>
            <Logo>
                <LogoIcon color="#1D4ED8" />
                <SearchBar />
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
