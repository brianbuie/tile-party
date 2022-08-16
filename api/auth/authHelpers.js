export const requireAuth = (req, res, next) => {
  const { user } = req;
  if (!user) return res.status(401).send({ message: 'You need to log in to do that.' });
  next();
};
