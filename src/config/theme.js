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
    nodes: {
        root: {
            fill: "#1D4ED8",
            textColor: "#FFFFFF",
            fontSize: 15,
            fontWeight: "600",
            letterSpacing: -0.07,
            lineHeight: 1.3,
            shadowColor: "black",
            shadowOpacity: 0.1,
            shadowBlur: 10.3,
            shadowOffsetX: 0,
            shadowOffsetY: 4,
        },
        child: {
            fill: "#FEF08A",
            textColor: "#444751",
            fontSize: 15,
            fontWeight: "600",
            letterSpacing: -0.07,
            lineHeight: 1.3,
            shadowColor: "black",
            shadowOpacity: 0.1,
            shadowBlur: 10.3,
            shadowOffsetX: 0,
            shadowOffsetY: 4,
        },
    },
};

export default theme;
