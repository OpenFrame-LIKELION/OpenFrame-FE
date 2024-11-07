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

const MainPage = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [login] = useRecoilState(loginState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!login) {
            navigate("/login");
        }
    }, [login, navigate]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return isLoading ? (
        <OnBoarding />
    ) : (
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
