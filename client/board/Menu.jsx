import styled from "styled-components";
import { Box, Button, Icon } from "~/ui";

const MenuButton = styled(Button).attrs({
  vertical: true,
  pad: "0",
  width: "15%",
})``;

export default function Menu({ anyTilesDeployed, recall, shuffle }) {
  const canSubmit = anyTilesDeployed;
  return (
    <Box row h_around pad="1rem 0">
      <MenuButton>
        <Icon.Burger />
        <span>More</span>
      </MenuButton>
      <MenuButton>
        <Icon.Pass />
        <span>Pass</span>
      </MenuButton>
      <Button.Primary disabled={!canSubmit}>Submit</Button.Primary>
      <MenuButton>
        <Icon.Swap />
        <span>Swap</span>
      </MenuButton>
      {anyTilesDeployed ? (
        <MenuButton onClick={recall}>
          <Icon.Recall />
          <span>Recall</span>
        </MenuButton>
      ) : (
        <MenuButton onClick={shuffle}>
          <Icon.Shuffle />
          <span>Shuffle</span>
        </MenuButton>
      )}
    </Box>
  );
}
