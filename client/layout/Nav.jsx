import styled from "styled-components";
import Box from "@/ui/Box";
import Button from "@/ui/Button";
import Logo from "@/brand/Logo";
import { routes, useFetch } from "@/utils/useFetch";

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
`;

const ProfilePic = () => {
  const [user] = useFetch("me");
  return user ? (
    <Button pad="0" as="a" href={routes.logout}>
      <ProfileImg src={user.image} title="Log Out" />
    </Button>
  ) : (
    <Box square="3rem" />
  );
};

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
