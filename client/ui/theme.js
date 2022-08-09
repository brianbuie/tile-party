const colors = {
  purple: "#502674",
  navy: "#131c3b",
  facebookBlue: "#3378f2",
  white: "#ffffff",
  green: "#1a9a4f",
  cream: "#fdf9c6",
  pink: "rgba(255, 142, 207, 1)",
  aqua: "#58baba",
  shadow: "rgba(102,57,116,0.6)",
  darkOverlay: "rgba(20, 10, 14, 0.35)",
  lightOverlay: "rgba(228, 160, 240, 0.07)",
  text: "#ffffff",
  textMuted: "rgba(201, 211, 253, 0.7)",
};

const theme = {
  colors,
  tile: {
    font: '"Source Code Pro", sans-serif',
    bkg: "rgba(66, 214, 214, 0.8)",
    topEdge: "rgba(255, 177, 237, 0.6)",
    bottomEdge: "rgba(44, 64, 110, 0.4)",
    textNormal: "rgba(40, 6, 75, 0.8)",
    textNormalEdge: "rgba(250, 164, 230, 0.7)",
    textActive: "rgba(255, 255, 255, 0.8)",
    textActiveEdge: "rgba(250, 164, 230, 0.7)",
  },
  browserTheme: "#3a1b4f",
  borderRadius: `${100 / 6.4}%`,
  screen: {
    mobile: "(max-width: 767px)",
    desktop: "(min-width: 768px)",
  },
};

export default theme;
