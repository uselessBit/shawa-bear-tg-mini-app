import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        bgColor: {
            100: "#F9F9F9",
            900: "#252525",
        },
        boxColor: {
            100: "#FFFFFF",
            900: "#1A1A1A",
        },
        textColor: {
            100: "#252525",
            900: "#F9F9F9",
        },
        accentColor: {
            100: "#FFCF0D",
            900: "#FFCF0D",
        },
        inputColor: {
            100: "#F5F5F5",
            900: "#F5F5F5",
        },
    },
    shadows: {
        light: "5px 5px 10px rgba(0, 0, 0, 0.03), -5px -5px 10px rgba(255, 255, 255, 1)",
        dark: "5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(26, 26, 26, 1)",
        selectLight: "0px 5px 10px rgba(0, 0, 0, 0.05)",
        selectDark: "0px 5px 10px rgba(0, 0, 0, 0.05)",
        botContainerLight: "0px -4px 20px rgba(0, 0, 0, 0.05)",
        buttonLight: "0px 2px 20px rgba(255, 207, 13, 0.7)",
    },
    components: {
        Button: {
            variants: {
                "main-button": {
                    bg: "#FFCF0D",
                    color: "#252525",
                    flex: 1,
                    borderRadius: 16,
                    h: 14,
                    fontSize: 20,
                    fontWeight: "bold",
                    shadow: "buttonLight",
                    fontFamily: "Montserrat",
                    _active: {
                        outline: "none",
                        boxShadow: "none",
                    },
                },
            },
        },
        Container: {
            variants: {
                "bot-container": {
                    bg: "boxColor.100",
                    w: "full",
                    maxW: "container.md",
                    px: 8,
                    py: 4,
                    shadow: "botContainerLight",
                    zIndex: 10,
                    pos: "fixed",
                    bottom: 0,
                    borderTopRadius: 26,
                },
            },
        },
    },
    styles: {
        global: {
            "*": {
                WebkitTapHighlightColor: "transparent",
            },
            "*:focus": {
                outline: "none",
                boxShadow: "none",
            },
        },
    },
});

export default theme;
