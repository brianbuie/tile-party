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
  facebookLogin: "/api/auth/login/facebook",
  facebookCallback: "/api/auth/callbacks/facebook",
  logout: "/api/auth/logout",
};

export default routes;
