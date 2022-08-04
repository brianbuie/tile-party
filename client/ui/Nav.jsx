import styled from "styled-components";
import Box from "~/ui/Box";
import Button from "~/ui/Button";
import Logo from "~/ui/Logo";
import { routes, useFetch } from "~/utils/useFetch";

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
`;

const ProfilePic = () => {
  const [user] = useFetch("me");
  return (
    user && (
      <Button pad="0" as="a" href={routes.logout}>
        <ProfileImg src={user.image} title="Log Out" />
      </Button>
    )
  );
};

export default function Nav({ children }) {
  return (
    <Box row as="nav" pad="1rem" width="100%">
      <Box row width="33%" justify="start">
        {children}
      </Box>
      <Box row width="33%">
        <Box width="150px">
          <Logo />
        </Box>
      </Box>
      <Box row width="33%" justify="end">
        <ProfilePic />
      </Box>
    </Box>
  );
}
