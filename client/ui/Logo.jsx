import styled from "styled-components";
import Box, { SquareOuter, SquareInner } from "~/ui/Box";
import useGameMode from "~/game/config/useGameMode";
import Tile from "~/game/Tile";

const PartySVG = styled(Party)`
  width: 60%;
  position: absolute;
  z-index: 40;
  bottom: 0;
  right: 0;
  overflow: visible;
  path {
    fill: #ff90ad;
  }
`;

export default function Logo() {
  const { getLetterValue } = useGameMode("FRIENDLY");
  return (
    <Box position="relative" width="100%" pad="0 0 45% 0">
      <Box row absolute={[0, 0, "auto", 0]}>
        {["T", "I", "L", "E"].map(letter => (
          <SquareOuter size="20%" margin="1px" key={letter}>
            <SquareInner>
              <Tile letter={letter} value={getLetterValue(letter)} />
            </SquareInner>
          </SquareOuter>
        ))}
      </Box>
      <PartySVG />
    </Box>
  );
}

function Party(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 44" {...props}>
      <path
        d="M33.5,17.2c1.1-1.3,1.9-2.7,2.6-4.2c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.3,0.2-0.6,0.2-0.9c0-0.3,0-0.6,0-0.8
		c0-0.2-0.2-0.5-0.3-0.6c-0.4-0.3-0.8-0.7-1.3-1.1c-0.5-0.4-1-0.7-1.5-1c-0.5-0.3-1.1-0.6-1.6-0.8c-0.6-0.2-1.1-0.3-1.7-0.4
		c-1.5-0.2-3-0.2-4.5,0c-1.8,0.2-3.6,0.6-5.3,1c-1.9,0.5-3.7,1.2-5.5,1.9c-1.9,0.8-3.6,1.6-5.3,2.5C8,13,6.5,13.9,5,15
		c-1.2,0.8-2.3,1.8-3.2,2.9c-0.5,0.5-0.8,1.1-1,1.7c-0.1,0.3-0.1,0.7,0.1,1C1,20.7,1.1,20.9,1.3,21c0.2,0.2,0.4,0.4,0.7,0.6
		c0.2,0.2,0.5,0.4,0.7,0.6c0.2,0.2,0.4,0.2,0.4,0.2c1.1-0.2,2.2-0.3,3.3-0.3c0.9,0,1.5,0.1,1.8,0.1c-0.2,0.5-0.5,0.9-0.9,1.3
		C6.9,24,6.5,24.4,6,24.7c-0.5,0.4-1,0.7-1.5,1.1c-0.5,0.3-1,0.7-1.5,1c-0.1,0.1-0.2,0.3-0.2,0.4c0,0.2,0,0.5,0.1,0.7
		c0.1,0.3,0.2,0.5,0.4,0.7c0.2,0.2,0.5,0.4,0.9,0.4c0.7,0.1,1.4,0.4,1.9,0.9c0.6,0.5,1.1,1.1,1.5,1.7c0.5,0.7,0.9,1.5,1.2,2.3
		c0.4,0.8,0.8,1.6,1.1,2.4c0.3,0.6,0.7,1.1,1.2,1.4c0.6,0.4,1.4,0.6,2.1,0.5c0.1,0,0.2,0,0.3-0.1c0.1-0.1,0.2-0.1,0.2-0.2
		c0-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2c-0.2-0.6-0.2-1.2-0.2-1.8c0-0.9,0.1-1.8,0.3-2.7c0.1-1,0.3-2,0.6-3
		c0.2-0.9,0.5-1.8,0.8-2.7c1-0.1,2-0.3,3-0.5c1.3-0.4,2.5-0.8,3.7-1.3c1.4-0.6,2.7-1.3,4.1-2.1c1.4-0.8,2.7-1.7,4-2.8
		C31.3,19.6,32.5,18.5,33.5,17.2z M26.9,19c-1.1,1-2.3,2-3.5,2.9c-1.2,0.9-2.5,1.7-3.8,2.4c-1.2,0.7-2.5,1.2-3.8,1.6
		c0.3-0.8,0.7-1.6,1.1-2.5c0.4-0.9,0.9-1.8,1.4-2.8c0.5-1,0.9-1.9,1.4-2.8c0.5-0.9,0.9-1.8,1.2-2.6c0.2-0.3,0.3-0.6,0.2-1
		c-0.1-0.2-0.4-0.4-0.9-0.6c-0.2-0.1-0.4-0.2-0.6-0.3c-0.2-0.1-0.5-0.2-0.7-0.4c-0.5-0.2-1.1-0.1-1.5,0.3c-1.1,1.4-2.1,2.9-2.9,4.5
		c-0.9,1.7-1.7,3.4-2.4,5.2c-0.7,1.8-1.2,3.6-1.6,5.5C10.2,30.3,10,32,10,33.8c-0.1-0.4-0.3-0.9-0.5-1.5c-0.2-0.6-0.5-1.1-0.8-1.7
		c-0.3-0.6-0.7-1.1-1.2-1.5c-0.5-0.5-1.1-0.8-1.7-1c0.3-0.2,0.6-0.5,1-0.9c0.4-0.4,0.9-0.7,1.4-1.2c0.5-0.4,0.9-0.8,1.3-1.2
		c0.3-0.3,0.6-0.6,0.8-0.9c0.2-0.4,0.1-0.9-0.2-1.3c-0.4-0.5-0.8-1-1.4-1.4c-0.2-0.1-0.4-0.2-0.6-0.2C7.7,21,7.3,21,7,21
		c-0.3,0-0.7,0-1.1,0c-0.4,0-0.7,0-1,0c1.8-1.7,3.8-3.3,5.9-4.8c2.2-1.5,4.6-2.9,7-4c2.4-1.1,4.9-2,7.5-2.6C27.6,9,30.1,8.8,32.5,9
		c0.4,0,0.8,0.1,1.2,0.4c0.2,0.2,0.2,0.6,0,0.8c-0.4,0.9-0.8,1.8-1.4,2.7c-0.7,1-1.5,2.1-2.3,3C29,17,28,18,26.9,19z"
      />
      <path
        d="M68.7,8C75,6,80.5,4.8,87.1,4.3c0.4,0,0.3-0.1,0-0.1c-6.2,0-11.4,0.7-17.4,2.2c1.2-2.3,2.8-5.5,4-5.2
		c0.7,0.3-1-1.5-3-1.1c-0.5,0.2-0.9,0.5-1.2,0.9c-0.8,0.9-1.6,2.2-3.7,6.3c-3.9,1.2-7.6,2.8-7.2,4.4c0.3,0.9,1.2,1.5,2.2,1.5
		c-1-0.4,0.8-2.4,4-3.7c-1,2-1.8,3.7-2.5,5.3c-0.8,1.8-1.4,3.5-2,4.9c-1.6,1.8-3.3,3.3-4.7,3.7c0.7-3,3.2-6.1,3.8-7
		c0.2-0.3-1.5-1.6-1.9-1.5c-1.1,0.5-2.1,1.3-2.9,2.2c-2.8,2.7-5.1,5.8-7.1,9.1c0.6-1.6,1.4-3.2,2.2-4.8c0.8-1.6,1.8-3.2,2.3-3.3
		c0.3,0,0.4,0.1,0.4,0c-0.4-1.1-1.4-1.8-2.6-1.9c-0.2,0-0.3,0.1-0.5,0.3c-1.2,1.5-2.1,3.2-2.9,5c-0.2,0.5-0.5,1-0.7,1.5
		c-2.1,2.8-5.3,6.9-7.1,7.8c0-0.4,0-0.9,0.1-1.3c0.7-2.5,3.2-6.9,3.4-6.6c0.1-0.5-1.5-2.2-2.1-1.7c-1.2,1.3-2.2,2.6-3.2,4
		c-1.6,1.9-5.9,6.3-7,6.9c-0.1,0-0.2,0.1-0.2,0c-0.2-0.1,0.6-2.6,2.3-5.6c0.6-1,1.3-2,2-3c2-2.4,4.3-4.3,6.3-4.8
		c0.7-0.3,1.6,0.1,1.9,0.8c0.1,0.1,0.1,0.3,0.1,0.4c0.1,0.5,0,0.9-0.2,1.3c0,0,0,0.1,0.1,0c0.3-0.5,0.4-1.2,0.4-1.8
		c-0.3-1.7-2.2-1.9-3.5-1.7c-6.5,1.2-13.2,10.5-12.6,14.4c0.4,0.9,1.1,1.7,2,2.1c0.1,0,0.2,0.1,0.3,0.1c1.5-0.3,7.3-7.4,8.2-8.7
		c-0.7,1.3-1.1,2.7-1.4,4.2c-0.1,0.5-0.1,0.9-0.1,1.4c0.2,0.7,0.8,1.2,1.5,1.5c0.2,0.1,0.4,0.1,0.6,0.1c1.6-0.3,4.6-4.2,7.1-7.9
		c-0.4,1.2-0.8,2.3-1.2,3.5c-0.2,0.6-0.3,1.3-0.2,1.9C44,31.5,45,32.5,46,32c-0.8-0.2,0.7-3.7,2.2-6c1.6-2.8,3.8-5.2,6.3-7.3
		c-0.7,1.2-1.5,3.5-1.3,4.5c0.1,0.4,1.4,1.5,2,1.4c1.5-0.3,3.5-2.2,4.8-3.8c-1.3,3.6-1.7,5.6-1.6,6.4c0,0.2,0.1,0.4,0.2,0.5
		c0.4,0.5,0.9,0.9,1.5,1.2c0.4,0.2,0.8,0.1,1.2-0.1c1.4-0.8,4.2-4.6,6.3-7.7c-0.7,2.1-1.2,3.9-1,4.9c0.3,0.9,1.1,1.5,2,1.5l0.3-0.1
		c2.1-0.8,6.1-7,9-11.3c-4,6.6-7.1,16.9-8.3,21.2c-0.4,1.4-0.7,2.9-0.8,4.4c0,0.7,0.9,2.5,2.3,2.1c0.1,0,0.3-0.1,0.4-0.2
		c0.1-1.8,3.5-10,7.8-15c0,0,0-0.2-0.2-0.2c-1,0.5-5.3,6.1-7.4,10.5c1.4-4.3,5.2-15.4,7.4-19.3c1.2-2.2,2.3-4.4,3.6-6.2l0,0
		c0.4-0.6,0.8-1,1.1-1c0.3,0,0.4,0.1,0.4,0c-0.4-1.1-1.4-1.8-2.6-1.9c-0.2,0-0.4,0.1-0.5,0.3c-1.7,1.9-3.9,5.4-5.5,7.6
		c-1.4,1.9-4.4,5.8-6,6.8c-0.2-1,1-4.5,2.4-7.1c0.9-1.8,2.1-3.8,2.7-3.8c0.3,0,0.4,0.1,0.4,0c-0.4-1.1-1.4-1.8-2.6-1.9
		c-0.2,0-0.4,0.1-0.5,0.3c-1.1,1.4-2.1,3-2.8,4.7c-0.2,0.5-0.5,1-0.7,1.6c-2.2,2.9-5.8,7.8-7.2,7.8c0.4-2.4,2.3-7.4,4.6-12.6
		C66.8,11.9,67.7,9.9,68.7,8z"
      />
    </svg>
  );
}