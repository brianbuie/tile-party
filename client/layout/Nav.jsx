import styled from "styled-components";
import Box from "@/ui/Box";
import Button from "@/ui/Button";
import Logo from "@/brand/Logo";
import { FacebookIcon } from "@/ui/Icons";
import { routes } from "@/utils/useFetch";

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
`;

const ProfilePic = ({ user }) => (
  <Button pad="0" size="2rem" as="a" href={routes.facebookLogin}>
    {user ? <ProfileImg src={user.image} title="Log Out" /> : <FacebookIcon />}
  </Button>
);

export default function Nav() {
  return (
    <Box row as="nav" pad="1rem" width="100%">
      <Box square="3rem" />
      <Box row grow>
        <Box width="40%" maxWidth="200px">
          <Logo />
        </Box>
      </Box>
      <ProfilePic />
    </Box>
  );
}
