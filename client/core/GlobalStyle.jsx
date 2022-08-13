import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "~/ui";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Source Code Pro';
    src: url("/SourceCodePro-VariableFont_wght.ttf") format("truetype"), url("/SourceCodePro-Italic-VariableFont_wght.ttf") format("truetype");
    font-weight: 200 900;
  }

	html {
		font-size: 16px;
		color: white;
		font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
	}

	body {
		padding: 0;
		margin: 0;
		background: linear-gradient(#502674, #131c3b);
	}

  html, body, #root {
    min-height: 100vh;
   	min-height: fill-available;
  }

	* {
		box-sizing: border-box;
	}
`;

const StyleProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default StyleProvider;
