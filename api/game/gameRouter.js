/*
	Init
*/
import express from "express";
import routes from "../../common/routes";
const router = express.Router();
const route = name => routes[name].replace("/api", "");

/*
	Fetch game
*/
import game from "./mock-game.json";
router.get(route("fetchGame"), async (req, res) => {
  const data = game;
  const { user } = req;
  res.status(200).json({ ...data, user });
});

export default router;
