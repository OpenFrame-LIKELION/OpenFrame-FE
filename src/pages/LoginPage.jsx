import styled from "styled-components";
import { LogoBig } from "../assets/icon/Icons";
import LoginKakao from "../assets/svg/login-kakao.svg?react";
import NodeSlider from "../components/Common/NodeSlider";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { UserAtom } from "../shared/recoil/UserAtom";

function LoginPage() {
    const navigate = useNavigate();
    const [userState] = useRecoilState(UserAtom);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (userState.isLogin) {
            navigate("/");
        } else {
            // 1초 후 애니메이션 시작
            setTimeout(() => {
                setIsAnimating(true);
            }, 1000);

            // 애니메이션 완료 후 상태 변경
            setTimeout(() => {
                setIsAnimating(false);
                setIsCompleted(true);
            }, 4000); // 애니메이션 시간이 1.5초이므로 2.5초 후 완료
        }
    }, [userState.isLogin, navigate]);

    return (
        <Container>
            <LogoWrapper
                className={
                    isCompleted ? "completed" : isAnimating ? "animate" : ""
                }
            >
                <LogoBig />
            </LogoWrapper>
            <FadeInWrapper
                iscompleted={isCompleted || isAnimating ? "true" : "false"}
            >
                <p>Think Out of Frame</p>
                <NodeSlider />
                <LoginKakao
                    style={{ marginTop: "90px" }}
                    onClick={() => {
                        location.href = import.meta.env.VITE_OAUTH_KAKAO_URL;
                    }}
                    cursor={"pointer"}
                />
            </FadeInWrapper>
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

    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    font-weight: 600;
    line-height: 1.3;
    letter-spacing: calc(-0.07em);

    p {
        margin: 0;
        font-size: 24px;
        color: #1d4ed8;
        margin-bottom: 70px;
    }
`;

const LogoWrapper = styled.div`
    position: fixed;
    bottom: 503px;
    transition: all 3s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &.animate {
        transform: scale(0.68) translateY(-360px);
    }

    &.completed {
        transform: scale(0.68) translateY(-360px);
    }
`;

const FadeInWrapper = styled.div`
    margin-top: 90px;
    transition: opacity 3s ease;
    opacity: ${(props) => (props.iscompleted === "true" ? 1 : 0)};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;
