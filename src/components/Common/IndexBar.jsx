import styled from "styled-components";
import { BookmarkIcon } from "../../assets/icon/Icons";
import Exit from "../../assets/svg/exit.svg?react";
import Settings from "../../assets/svg/settings.svg?react";
import userPofile from "../../assets/svg/profile.png";
import Toggle from "../../assets/svg/toggle-on.svg?react";

const IndexBar = ({ selectedNodeId }) => {
    return (
        <Wrapper>
            <Container>
                <IndexLogo>
                    <BookmarkIcon />
                    <span>IndexBar</span>
                </IndexLogo>
                <Divider />
                <span>Thesis Count: {selectedNodeId || 0}</span>
            </Container>
            <Container2>
                <LeftSection>
                    <img src={userPofile} alt="User Profile" />
                    <div className="user-info">
                        <div>홍길동</div>
                        <div>cho@example.com</div>
                        <div>카카오: 홍길동2</div>
                    </div>
                    <div className="user-actions">
                        <Exit />
                        <Settings />
                    </div>
                </LeftSection>
                <RightSection>
                    <NodeWrapper>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <NodeContainer>
                                {index + 1}
                                <Toggle width={16} height={16} />
                            </NodeContainer>
                        ))}
                    </NodeWrapper>
                    <div>left 3/4 right</div>
                </RightSection>
            </Container2>
        </Wrapper>
    );
};

export default IndexBar;

const NodeContainer = styled.div`
    background-color: white;
    padding: 11.5px 13px;
    border-radius: 10px;
    font-size: 15px;
    width: 412px;

    display: flex;
    justify-content: space-between;

    border: 1px solid #bfc6dd;

    box-sizing: border-box;
`;

const Container2 = styled.div`
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 25px 25px 0 0;

    display: flex;
    gap: 20px;
    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    gap: 15px;

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        font-size: 14px;
        color: #444751;
        text-align: center;
    }

    .user-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

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
`;

const Wrapper = styled.div`
    position: absolute;
    bottom: 500px;
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
    letter-spacing: ${({ theme }) =>
        theme.fonts.english.semiBold.letterSpacing};
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
