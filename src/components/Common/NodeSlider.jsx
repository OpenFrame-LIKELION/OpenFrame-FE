import styled from "styled-components";
import NodeHTML from "./NodeHTML";

const text = [
    "권력의 오남용은 사회적 문제를 일으킬 수 있다.",
    "문학은 삶을 왜곡하거나 미화한다.",
    "인간의 본성에는 선과 악이 모두 존재한다.",
    "지식은 종종 오해와 갈등을 불러온다.",
    "행복은 과정일 수도, 목표일 수도 있다.",
    "시간이 상처를 완화시키지만 치유의 보장은 없다.",
    "삶의 의미는 각자 정의하는 것이다.",
    "컵라면은 3분 이상 지나야 면이 잘 익는다.",
    "양말 한 짝이 자주 사라지는 이유는 아직도 논란이다.",
    "현대인의 커피 소비는 늘어나는 추세다.",
    "권력의 오남용은 사회적 문제를 일으킬 수 있다.",
    "문학은 삶을 왜곡하거나 미화한다.",
    "인간의 본성에는 선과 악이 모두 존재한다.",
    "지식은 종종 오해와 갈등을 불러온다.",
    "행복은 과정일 수도, 목표일 수도 있다.",
    "시간이 상처를 완화시키지만 치유의 보장은 없다.",
    "삶의 의미는 각자 정의하는 것이다.",
    "컵라면은 3분 이상 지나야 면이 잘 익는다.",
    "양말 한 짝이 자주 사라지는 이유는 아직도 논란이다.",
    "현대인의 커피 소비는 늘어나는 추세다.",
];

const text2 = [
    "교육은 사회적, 개인적 발전에 필수적이다.",
    "사람은 환경과 개인적 선택에 영향을 받는다.",
    "감정은 종종 이성을 압도한다.",
    "지식은 올바른 사용이 중요하다.",
    "예술은 현실과 상상력의 교차점이다.",
    "고통은 성장에 기여할 수도, 해로울 수도 있다.",
    "진리는 절대적일 수도, 상대적일 수도 있다.",
    "강아지는 스트레스를 줄여주는 효과가 있다고 알려져 있다.",
    "아침 물 섭취가 필수는 아니다.",
    "집에서 편리하게 음식을 주문하는 것은 현대 생활의 트렌드다.",
    "교육은 사회적, 개인적 발전에 필수적이다.",
    "사람은 환경과 개인적 선택에 영향을 받는다.",
    "감정은 종종 이성을 압도한다.",
    "지식은 올바른 사용이 중요하다.",
    "예술은 현실과 상상력의 교차점이다.",
    "고통은 성장에 기여할 수도, 해로울 수도 있다.",
    "진리는 절대적일 수도, 상대적일 수도 있다.",
    "강아지는 스트레스를 줄여주는 효과가 있다고 알려져 있다.",
    "아침 물 섭취가 필수는 아니다.",
    "집에서 편리하게 음식을 주문하는 것은 현대 생활의 트렌드다.",
];

const NodeSlider = () => {
    return (
        <NodesContainer>
            <NodeLine direction="right">
                {text.map((t, i) => (
                    <NodeHTML key={i} text={t} />
                ))}
            </NodeLine>
            <NodeLine direction="left">
                {text2.map((t, i) => (
                    <NodeHTML key={i} text={t} />
                ))}
            </NodeLine>
        </NodesContainer>
    );
};

export default NodeSlider;

const NodesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    align-items: center;
    justify-content: center;
`;

const NodeLine = styled.div`
    display: flex;
    gap: 20px;
    animation: ${(props) =>
            props.direction === "right" ? "moveRight" : "moveLeft"}
        120s linear infinite;

    @keyframes moveRight {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(35%);
        }
    }

    @keyframes moveLeft {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-35%);
        }
    }
    justify-content: center;
    align-items: center;

    width: 100%;

    overflow: hidden;
    white-space: nowrap;
`;
