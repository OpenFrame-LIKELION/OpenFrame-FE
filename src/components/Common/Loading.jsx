import styled from "styled-components";
import { LogoBig } from "../../assets/icon/Icons";

const Loading = () => {
    return (
        <Container>
            <LogoBig />
        </Container>
    );
};
export default Loading;

const Container = styled.div`
    width: 100%;
    height: 90dvh;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`;
