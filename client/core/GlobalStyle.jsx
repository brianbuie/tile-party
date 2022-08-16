import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '~/ui';

const GlobalStyle = createGlobalStyle`
  :root {
    /* Exported from Adobe XD */
    --crown-gold: #fdce82;
    --dashboard-left-overlay-bkg: rgba(20, 10, 14, 0.10);
    --modal-body-bkg-gradient: #7b4ea2 0%, #534b91 100%;
    --modal-header-bkg: #563b7b;
    --modal-overlay-bkg-gradient: #251753 0%, #2f0a43 50%, #131946 100%;
    --nav-bkg: #261741;
    --page-bkg-gradient: #502674 0%, #131c3b 100%;
    --primary-gradient: #ff4db3 0%, #f08d58 100%;
    --primary-pink: #ff4eb3;
    --spot-bkg: #39225f;
    --spot-outline: #583c77;
    --spot-outline-dl: #659132;
    --spot-outline-dw: #d5854b;
    --spot-outline-tl: #baab37;
    --spot-outline-tw: #d54b56;
    --text: #fff;
    --text-disabled: rgba(201, 211, 253, 0.66);
    --tile-bkg: #583c78;
    --tile-outline: #af64e6;
    --tile-text: #ffc1f7;
    /* Export End */
  }

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
