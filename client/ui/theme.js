import { css } from 'styled-components';

export const colors = css`
  /* Exported from Adobe XD */
  --crown-gold: #fdce82;
  --dashboard-left-overlay-bkg: rgba(20, 10, 14, 0.1);
  --modal-body-bkg-gradient: #7b4ea2 0%, #534b91 100%;
  --modal-header-bkg: #563b7b;
  --modal-overlay-bkg-gradient: #251753 0%, #2f0a43 50%, #131946 100%;
  --nav-bkg: #261741;
  --overlay-light: rgba(235, 184, 244, 0.07);
  --page-bkg-gradient: #502674 0%, #131c3b 100%;
  --primary-button-outline: #f8cfba;
  --primary-gradient: #ff4db3 0%, #f08d58 100%;
  --primary-pink: #ff4eb3;
  --spot-bkg: #39225f;
  --spot-outline: #583c77;
  --spot-outline-dl: #659132;
  --spot-outline-dw: #d5854b;
  --spot-outline-tl: #baab37;
  --spot-outline-tw: #d54b56;
  --text-default: #fff;
  --text-muted: rgba(201, 211, 253, 0.66);
  --tile-bkg: #f2a888;
  --tile-outline: #de689e;
  --tile-text: #791b25;
  /* Export End */

  /* Gradient Implementations */
  --primary-linear-gradient: linear-gradient(to right, var(--primary-gradient));
  --page-linear-gradient: linear-gradient(var(--page-bkg-gradient));
`;

const theme = {
  tileFontFamily: '"Source Code Pro", sans-serif',
  borderRadius: '22%',
  responsiveBorder: '6.6%',
  screen: {
    mobile: '(max-width: 767px)',
    desktop: '(min-width: 768px)',
  },
};

export default theme;
