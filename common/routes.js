const routes = {
  // games
  viewGames: "/api/game/all",
  // game
  createGame: "/api/game/new",
  joinGame: "/api/game/:id/join",
  startGame: "/api/game/:id/start",
  makeMove: "/api/game/:id/go",
  viewGame: "/api/game/:id",
  // auth
  me: "/api/auth/me",
  logout: "/api/auth/logout",
  facebookLogin: "/api/auth/facebook/login",
  facebookCallback: "/api/auth/facebook/callback",
  mockLogin: "/api/auth/mock/login",
};

export default routes;
