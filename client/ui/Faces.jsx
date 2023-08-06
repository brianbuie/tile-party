import { Box, theme } from '~/ui';

export const Face = ({ user, size, variant }) => {
  const bkg = {
    muted: 'var(--spot-outline)',
    default: 'var(--tile-outline)',
    highlight: 'var(--primary-linear-gradient)',
  };
  return (
    user && (
      <Box.Square circle size={size} bkg={bkg[variant || 'default']}>
        <Box circle bkgImage={user.image} absolute={theme.responsiveBorder} />
      </Box.Square>
    )
  );
};

export const Faces = ({ users, size, variant }) => {
  if (!users?.length) return null;
  return users.length > 1 ? (
    <Box.Square size={size}>
      <Box absolute={['30%', 0, 0, '30%']} z='2'>
        <Face user={users[0]} variant={variant} />
      </Box>
      <Box absolute={[0, '30%', '30%', 0]} z='1'>
        <Face user={users[1]} variant={variant} />
      </Box>
    </Box.Square>
  ) : (
    <Face user={users[0]} size={size} variant={variant} />
  );
};
