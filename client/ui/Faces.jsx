import { Box } from "~/ui";

export const Face = ({ user, size }) =>
  user && (
    <Box.Square size={size}>
      <Box rounded="full" bkgImage={user.image} absoluteFill />
    </Box.Square>
  );

export const Faces = ({ users, size }) => {
  if (!users?.length) return null;
  return users.length > 1 ? (
    <Box.Square size={size}>
      <Box rounded="full" bkgImage={users[0].image} absolute={["30%", 0, 0, "30%"]} z="2" />
      <Box rounded="full" bkgImage={users[1].image} absolute={[0, "30%", "30%", 0]} z="1" />
    </Box.Square>
  ) : (
    <Face user={users[0]} size={size} />
  );
};
