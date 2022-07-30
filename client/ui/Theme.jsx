import { createGlobalStyle, ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    purple: "#502674",
    navy: "#131c3b",
    facebookBlue: "#3378f2",
    white: "#ffffff",
    limeGreen: "#59b62d",
    cream: "#fdf9c6",
    pink: "#fc90ad",
    aqua: "#58baba",
    shadow: "rgba(102,57,116,0.6)",
  },
  tile: {
    bkg: "rgba(66, 214, 214, 0.8)",
    topEdge: "rgba(255, 177, 237, 0.6)",
    bottomEdge: "rgba(44, 64, 110, 0.4)",
    textNormal: "rgba(40, 6, 75, 0.8)",
    textNormalEdge: "rgba(250, 164, 230, 0.7)",
    textActive: "rgba(255, 255, 255, 0.8)",
    textActiveEdge: "rgba(250, 164, 230, 0.7)",
  },
  fontFamily: `"Source Code Pro", sans-serif`,
  borderRadius: `${100 / 6.4}%`,
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Source Code Pro';
    src: url("/SourceCodePro-VariableFont_wght.ttf") format("truetype"), url("/SourceCodePro-Italic-VariableFont_wght.ttf") format("truetype");
    font-weight: 200 900;
  }

	html {
		font-size: 15px;
		color: white;
		font-family: ${theme.fontFamily};
	}

	body {
		padding: 0;
		margin: 0;
		background: linear-gradient(${theme.colors.purple}, ${theme.colors.navy});
		min-height: 100vh;
	}

	* {
		box-sizing: border-box;
	}
`;

const Theme = ({ children }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);

export default Theme;
