import styled from "styled-components";
import { BookmarkIcon } from "../../assets/icon/Icons";
import Exit from "../../assets/svg/exit.svg?react";
import Settings from "../../assets/svg/settings.svg?react";
import userPofile from "../../assets/svg/profile.png";
import Toggle from "../../assets/svg/toggle-on.svg?react";
import Left from "../../assets/svg/left.svg?react";
import Right from "../../assets/svg/right.svg?react";
import { useState } from "react";

const IndexBar = ({ selectedNodeId }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleContainerClick = () => {
        setIsExpanded((prev) => !prev);
    };
    return (
        <Wrapper isExpanded={isExpanded}>
            <Container onClick={handleContainerClick}>
                <IndexLogo>
                    <BookmarkIcon />
                    <span>Index</span>
                </IndexLogo>
                <Divider />
                <span>Thesis Count: {selectedNodeId || 0}</span>
            </Container>
            <Container2>
                <LeftSection>
                    <img src={userPofile} alt="User Profile" />
                    <div className="user-info">
                        <div className="name">홍길동 님</div>
                        <div>cho@example.com</div>
                        <div>카카오 계정 로그인</div>
                    </div>
                    <div className="user-actions">
                        <div>
                            <Exit /> 로그아웃
                        </div>
                        <div>
                            <Settings /> 환경 설정
                        </div>
                    </div>
                </LeftSection>
                <RightSection>
                    <NodeWrapper>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <NodeContainer key={index}>
                                {index + 1}
                                <Toggle width={15.22} height={15.22} />
                            </NodeContainer>
                        ))}
                    </NodeWrapper>
                    <div className="index">
                        <Left width={12.35} height={20} />
                        <div>3/4</div>
                        <Right width={12.35} height={20} />
                    </div>
                </RightSection>
            </Container2>
        </Wrapper>
    );
};

export default IndexBar;

const NodeContainer = styled.div`
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    font-size: 15px;
    width: 412px;
    height: 45.22px;

    display: flex;
    justify-content: space-between;

    border: 1px solid #bfc6dd;

    box-sizing: border-box;

    // 화면 크기
    // 1280px 이하: 1개
    // 1280px 이상: 3개
    // 1920px 이상: 4개
    @media (max-width: 1550px) {
        width: 350px;
    }

    @media (max-width: 1350px) {
        width: 300px;
    }

    @media (max-width: 1220px) {
        width: 250px;
    }

    @media (max-width: 1050px) {
        width: 180px;
    }
`;

const Container2 = styled.div`
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 25px 25px 0 0;

    display: flex;
    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.3;
    letter-spacing: calc(-0.03em);
    font-size: 12px;
    margin-right: 56px;

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .user-info {
        margin-top: 20px;

        div {
            margin-top: 5px;
        }

        .name {
            font-size: 15px;
            margin-top: 0;
            margin-bottom: 10px;
        }
    }

    .user-actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 56px;

        div {
            letter-spacing: calc(-0.07em);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        svg {
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
`;

const NodeWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    column-gap: 20px;
`;

const RightSection = styled.div`
    padding-left: 30px;
    border-left: 1px solid #bfc6dd;

    display: flex;
    gap: 14px;
    flex-direction: column;
    align-items: end;

    .index {
        display: flex;
        gap: 19.33px;
        align-items: center;

        div {
            font-size: 15px;
            letter-spacing: calc(-0.03em);
            margin-top: 3px;
        }

        svg {
            cursor: pointer;
        }
    }
`;

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

    transform: ${({ isExpanded }) =>
        isExpanded
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
