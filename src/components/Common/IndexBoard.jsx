import styled from "styled-components";
import Exit from "../../assets/svg/exit.svg?react";
import Settings from "../../assets/svg/settings.svg?react";
import Toggle from "../../assets/svg/toggle-on.svg?react";
import Left from "../../assets/svg/left.svg?react";
import Right from "../../assets/svg/right.svg?react";
import Logo from "../../assets/svg/logo.svg?react";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../shared/recoil/UserAtom";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const IndexBoard = ({ nodes, setNodes, isExpanded }) => {
    const [userState, setUserState] = useRecoilState(UserAtom);
    const user = jwtDecode(userState.accessToken);
    user.name = user.name || user.email.split("@")[0];
    const location = useLocation();

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    const filteredNodes = nodes.filter((node) => node.checked);
    const totalPages = Math.ceil(filteredNodes.length / itemsPerPage);

    const currentNodes = filteredNodes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (direction) => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        } else if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const openModal = (node) => {
        setSelectedNode(node);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNode(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (!isExpanded) {
            closeModal();
        }
    }, [isExpanded]);

    return (
        <Container>
            <LeftSection>
                <Logo />
                <div className="user-info">
                    <div className="name">{user.name} 님</div>
                    <div>{user.email}</div>
                    <div>카카오 계정 로그인</div>
                </div>
                <div className="user-actions">
                    <div
                        onClick={() => {
                            setUserState({
                                accessToken: "",
                                refreshToken: "",
                                isLogin: false,
                            });
                            location.href = "/";
                        }}
                    >
                        <Exit /> 로그아웃
                    </div>
                    <div
                        onClick={() => {
                            alert("개발 중입니다.");
                        }}
                    >
                        <Settings /> 환경 설정
                    </div>
                </div>
            </LeftSection>
            <RightSection>
                <NodeWrapper>
                    {currentNodes.map((node) => (
                        <NodeContainer
                            key={node.id}
                            onClick={() => openModal(node)}
                        >
                            <div className="text">{node.text}</div>
                            <div
                                className="toggle"
                                onClick={(e) => {
                                    e.stopPropagation(); // 모달 열림과 toggle 클릭 충돌 방지
                                    node.checked = !node.checked;
                                    setNodes([...nodes]);
                                }}
                            >
                                <Toggle width={15.22} height={15.22} />
                            </div>
                        </NodeContainer>
                    ))}
                </NodeWrapper>
                {filteredNodes.length > itemsPerPage && (
                    <div className="index">
                        <Left
                            width={12.35}
                            height={20}
                            onClick={() => handlePageChange("prev")}
                        />
                        <div>
                            {currentPage}/{totalPages}
                        </div>
                        <Right
                            width={12.35}
                            height={20}
                            onClick={() => handlePageChange("next")}
                        />
                    </div>
                )}
            </RightSection>

            {isModalOpen && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h2>문장</h2>
                        <p>{selectedNode?.text}</p>
                        <h2>메모</h2>
                        <textarea
                            rows={5}
                            placeholder="메모를 입력하세요."
                            value={selectedNode?.memo}
                            onChange={(e) => {
                                selectedNode.memo = e.target.value;
                                setNodes([...nodes]);
                            }}
                        />
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default IndexBoard;

const Container = styled.div`
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 25px 25px 0 0;

    display: flex;
    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);

    width: calc(100dvw - 300px);

    min-width: 500px;
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
            cursor: pointer;
        }

        svg {
            width: 24px;
            height: 24px;
        }
    }
`;

const RightSection = styled.div`
    padding-left: 30px;
    border-left: 1px solid #bfc6dd;

    display: flex;
    gap: 14px;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
    flex: 1;

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

const NodeWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    column-gap: 20px;
`;

const NodeContainer = styled.div`
    background-color: white;
    padding: 14px 15px 12px 15px;
    border-radius: 10px;
    font-size: 15px;
    flex: 1;
    height: 45.22px;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    gap: 5px;

    border: 1px solid #bfc6dd;

    box-sizing: border-box;

    .text {
        overflow-y: scroll;
    }

    .toggle {
        cursor: pointer;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border-radius: 25px 25px 0 0;
`;

const ModalContent = styled.div`
    background: white;
    padding: 15px;
    border-radius: 15px;
    width: 860px;
    max-height: 240px;
    overflow-y: auto;
    text-align: start;
    font-size: 15px;
    font-weight: 400;

    h2 {
        border-bottom: 1px solid #bfc6dd;
        margin-bottom: 10px;
    }

    textarea {
        width: 95%;
        border: none;

        font-size: 15px;
        font-weight: 400;

        resize: none;
        outline: none;
    }

    textarea::placeholder {
        font-size: 15px;
        font-weight: 400;
    }
`;
