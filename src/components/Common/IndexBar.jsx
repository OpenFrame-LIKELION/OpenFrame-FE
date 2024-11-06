import styled from "styled-components";
import { BookmarkIcon } from "../../assets/icon/Icons";

const IndexBar = ({ selectedNodeId }) => {
    return (
        <Container>
            <IndexLogo>
                <BookmarkIcon />
                <span>IndexBar</span>
            </IndexLogo>
            <Divider />
            <span>Thesis Count: {selectedNodeId || 0}</span>
        </Container>
    );
};

export default IndexBar;

const Container = styled.div`
    position: absolute;
    bottom: 68px;
    z-index: 10;
    left: calc(50%);
    transform: translateX(-50%);

    height: 30px;
    padding: 0px 15px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;

    display: flex;
    align-items: center;
    gap: 15px;

    font-size: ${({ theme }) => theme.fonts.english.semiBold.size};
    font-weight: ${({ theme }) => theme.fonts.english.semiBold.weight};
    color: #444751;
    line-height: 1.3;
    letter-spacing: ${({ theme }) =>
        theme.fonts.english.semiBold.letterSpacing};

    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);
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
