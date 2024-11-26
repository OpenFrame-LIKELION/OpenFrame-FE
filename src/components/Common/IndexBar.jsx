import styled from "styled-components";
import { BookmarkIcon } from "../../assets/icon/Icons";
import { useState } from "react";
import IndexBoard from "./IndexBoard";
import { BackLayer } from "../../config/theme";

const IndexBar = ({ selectedNodeId, nodes, setNodes }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleContainerClick = () => {
        setIsExpanded((prev) => !prev);
    };
    return (
        <>
            {isExpanded && <BackLayer onClick={() => setIsExpanded(false)} />}
            <Wrapper $isExpanded={isExpanded}>
                <Container onClick={handleContainerClick}>
                    <IndexLogo>
                        <BookmarkIcon />
                        <span>Index</span>
                    </IndexLogo>
                    <Divider />
                    <span>Thesis Count: {selectedNodeId || 0}</span>
                </Container>
                {
                    <IndexBoard
                        nodes={nodes}
                        setNodes={setNodes}
                        isExpanded={isExpanded}
                    />
                }
            </Wrapper>
        </>
    );
};

export default IndexBar;

const Wrapper = styled.div`
    position: absolute;
    bottom: 0px;
    z-index: 10;
    left: calc(50%);
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    font-size: ${({ theme }) => theme.fonts.english.semiBold.size};
    font-weight: ${({ theme }) => theme.fonts.english.semiBold.weight};
    color: #444751;
    line-height: 1.3;
    letter-spacing: calc(-0.07em);

    transform: ${({ $isExpanded }) =>
        $isExpanded
            ? "translateY(0px) translateX(-50%);"
            : "translateY(330px) translateX(-50%);"};

    transition: transform 0.3s;
`;

const Container = styled.div`
    height: 30px;
    padding: 0px 15px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;

    display: flex;
    align-items: center;
    gap: 15px;

    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);
    cursor: pointer;
`;

const IndexLogo = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const Divider = styled.div`
    width: 0px;
    height: 11px;
    border: 0.5px solid #444751;
`;
