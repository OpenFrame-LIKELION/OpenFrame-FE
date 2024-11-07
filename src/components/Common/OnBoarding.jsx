import styled from "styled-components";
import { LogoBig } from "../../assets/icon/Icons";

const OnBoarding = () => {
    return (
        <Container>
            <LogoBig />
        </Container>
    );
};
export default OnBoarding;

const Container = styled.div`
    width: 100%;
    height: 90dvh;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`;
