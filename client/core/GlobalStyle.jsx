import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "~/ui";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Source Code Pro';
    src: url("/SourceCodePro-VariableFont_wght.ttf") format("truetype"), url("/SourceCodePro-Italic-VariableFont_wght.ttf") format("truetype");
    font-weight: 200 900;
  }

	@font-face {
		font-family: 'Rubik';
		src: url("/Rubik-SemiBold.ttf") format("truetype");
	}

	html {
		font-size: 16px;
		color: white;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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

const StyleProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default StyleProvider;
