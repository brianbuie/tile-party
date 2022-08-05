import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme";

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
	}

  html, body, #root {
    min-height: 100vh;
   	min-height: fill-available;
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
