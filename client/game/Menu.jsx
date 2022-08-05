import Box from "~/ui/Box";
import Button from "~/ui/Button";
import { BurgerIcon, ShuffleIcon, SwapIcon, PassIcon, RecallIcon } from "~/ui/Icons";
import theme from "~/ui/theme";

const IconButton = ({ Icon, title, ...props }) => (
  <Box width="20%">
    <Button size="1rem" pad="0.5em 0" {...props}>
      <Box col>
        <Icon />
        <span>{title}</span>
      </Box>
    </Button>
  </Box>
);

export default function Menu({ anyTilesDeployed, recall, shuffle }) {
  const canSubmit = anyTilesDeployed;
  return (
    <Box row justify="space-around" width="100%" pad="1rem 0">
      <IconButton Icon={BurgerIcon} title="MORE" />
      <IconButton Icon={PassIcon} title="PASS" />
      <Box width="20%">
        <Button
          size="1rem"
          color={canSubmit ? theme.tile.bkg : "rgba(255,255,255,0.1)"}
          textColor={canSubmit ? theme.tile.textNormal : theme.tile.textActive}
          pad="1em 2em"
          maxWidth="100%"
          disabled={!canSubmit}
        >
          SUBMIT
        </Button>
      </Box>
      <IconButton Icon={SwapIcon} title="SWAP" />
      {anyTilesDeployed ? (
        <IconButton Icon={RecallIcon} title="RECALL" onClick={recall} />
      ) : (
        <IconButton Icon={ShuffleIcon} title="SHUFFLE" onClick={shuffle} />
      )}
    </Box>
  );
}
