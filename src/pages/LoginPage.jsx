import styled from "styled-components";
import { LogoMedium } from "../assets/icon/Icons";
import { ReactComponent as LoginGoogle } from "../assets/svg/login-google.svg";
import NodeSlider from "../components/Common/NodeSlider";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../shared/recoil/authAtom";
import { useEffect } from "react";

function LoginPage() {
    const navigate = useNavigate();
    const [login, setLogin] = useRecoilState(loginState);

    useEffect(() => {
        if (login) {
            navigate("/");
        }
    }, [login, navigate]);

    return (
        <Container>
            <LogoMedium />
            <p>Think Out of Frame</p>
            <NodeSlider />
            <LoginGoogle
                onClick={() => {
                    setLogin(true);
                }}
                cursor={"pointer"}
            />
        </Container>
    );
}

export default LoginPage;

const Container = styled.div`
    margin: 0;
    padding: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: #f4f8fd;
    background-image: radial-gradient(#d9d9d9 10%, transparent 0);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 90px;

    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.1px;

    p {
        font-size: 24px;
        color: #1d4ed8;
    }
`;
