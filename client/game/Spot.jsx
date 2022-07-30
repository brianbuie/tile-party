import styled from "styled-components";
import Box from "@/ui/Box";

const spotColors = {
  BLANK: "#5b4086",
  CENTER: "#d05a8d",
  DL: "#4382cc",
  DW: "#d05a8d",
  TL: "#6fa02b",
  TW: "#e5782e",
};

const spotLabels = {
  BLANK: " ",
  CENTER: "C",
  DL: "DL",
  DW: "DW",
  TL: "TL",
  TW: "TW",
};

const SpotBkg = styled(Box)`
  transform: scale(0.9);
  box-shadow: inset 0 3px 0 rgba(26, 36, 75, 0.25), 0 1px 0 rgb(242, 88, 207, 0.25);
  opacity: 0.9;
  svg {
    width: 100%;
  }
`;

const SpotLabel = styled.text`
  font-family: ${({ theme }) => theme.fontFamily};
  fill: white;
  font-size: 45px;
  text-anchor: middle;
`;

export default function Spot({ type }) {
  return (
    <SpotBkg absoluteFill rounded bkg={spotColors[type]}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <SpotLabel x="50%" y="50%" dominantBaseline="central">
          {spotLabels[type]}
        </SpotLabel>
      </svg>
    </SpotBkg>
  );
}
