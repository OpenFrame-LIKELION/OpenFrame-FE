
<img width="1329" alt="image (16)" src="https://github.com/user-attachments/assets/7817b1f6-608b-4225-bc12-7e1fa18be7bf">

## 소개

사용자가 특정 주제에 대해 다양한 관점을 접하고 사고의 폭을 확장할 수 있도록 돕는 아이데이션 특화 서비스입니다.

심리적 편향에서 벗어나 창의적이고 균형 잡힌 아이디어를 도출하도록 돕습니다.

직장인과 학생을 비롯해 아이디어 발상이 필요한 모든 사람들이 효과적으로 사고를 확장할 수 있도록 합니다.

## 배경

많은 사람들이 아이데이션 과정에서 어려움을 겪는 이유는 사고의 한계를 만드는 **Availability Heuristic**(가용성 휴리스틱)과 **Anchoring Effect**(앵커링 효과)와 같은 심리적 편향에 있습니다.

**“코끼리를 생각하지 마세요!” ⇒ 🐘🐘🐘**

“코끼리를 생각하지 마세요”라는 문장을 들으면 오히려 코끼리만 생각나게 됩니다.
이러한 편향은 사고를 고정시키고 다양한 관점을 탐구하지 못하게 만듭니다.

**Openframe**은 이 문제를 해결하기 위해 다양한 관점을 제공하여 사용자가 사고의 틀을 벗어나 더 창의적이고 균형 잡힌 아이디어를 도출할 수 있도록 돕습니다.

## Frontend 핵심 기능

### **React-Konva**를 활용하여 트리 형태의 그래프를 시각화하는 로직을 구현 및 조작 UI 제공

- **React-Konva**는 HTML5 Canvas를 React 환경에서 쉽게 사용할 수 있도록 하는 라이브러리입니다.
1. **노드 구성 및 관리**
    - **Node 클래스**: 각 노드를 객체로 정의하여 부모-자식 관계, 위치, 크기, 메모 등을 관리합니다.
    - **노드 및 연결 정보 관리**: 직렬화 및 역직렬화를 통해 노드와 링크 데이터를 저장 및 복원합니다.
2. **트리 그래프 구성**
    - **노드 크기 조정**: resizeNodeWidth 함수는 텍스트 크기에 따라 노드 크기를 동적으로 계산합니다.
    - **노드 위치 정렬**: repositionNodes는 계층 구조에 따라 노드 간 상호 위치를 자동으로 조정합니다.
    - **자식 노드 이동**: moveChildren을 사용해 자식 노드를 상속된 위치에 동기화합니다.
3. **데이터 저장 및 복원**
    - **직렬화 (Serialization)**: serializeNodes 및 serializeLinks를 사용해 노드 및 연결 정보를 JSON 형식으로 로컬스토리지에 저장합니다.
    - **역직렬화 (Deserialization)**: deserializeNodes와 deserializeLinks를 통해 저장된 데이터를 복원합니다.

## 주요 화면
![image](https://github.com/user-attachments/assets/2df1bbc8-0de4-46e0-b10b-749c81844440)
![image](https://github.com/user-attachments/assets/3a04d38c-cde3-4242-ae19-e48c6cf9b622)
![image](https://github.com/user-attachments/assets/32104507-eebc-461a-9f7b-61c5a810141e)
![image](https://github.com/user-attachments/assets/fe38cfd7-608e-43dc-81fc-1a249e76a9c0)



