import styled from "styled-components";

const theme = {
    default: {
        fontFamily: "Gothic A1",
    },
    colors: {
        primary: "#1D4ED8",
        accent: "#FEF08A",
        background: "#F4F8FD",
        white: "#FFFFFF",
    },
    fonts: {
        korean: {
            medium: {
                weight: "500",
                letterSpacing: "-0.07em",
                size: "12px",
            },
            semiBold: {
                weight: "600",
                letterSpacing: "-0.07em",
                size: "12px",
            },
            semiBoldLarge: {
                weight: "600",
                letterSpacing: "-0.07em",
                size: "15px",
            },
        },
        english: {
            semiBold: {
                weight: "600",
                letterSpacing: "0",
                size: "12px",
            },
        },
    },
};

export const BackLayer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 9;
`;

export default theme;
