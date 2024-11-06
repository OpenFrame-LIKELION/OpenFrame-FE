import styled from "styled-components";
import { ReactComponent as Toggle } from "../../assets/svg/toggle-on.svg";

const NodeHTML = ({ text }) => {
    return (
        <NodeContainer>
            {text}
            <Toggle width={16} height={16} />
        </NodeContainer>
    );
};

export default NodeHTML;

const NodeContainer = styled.div`
    background-color: #fef98a;
    padding: 16.46px;
    border-radius: 10.97px;
    font-size: 16.46px;

    display: flex;
    align-items: center;
    gap: 7.68px;

    box-shadow: 0px 4.39px 11.3px rgba(0, 0, 0, 0.05);
`;
