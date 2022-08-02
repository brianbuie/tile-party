/*
	Init
*/
import express from "express";
import routes from "../../common/routes";
const gameRouter = express.Router();
const route = name => routes[name].replace("/api/game", "");

/*
	Models
*/
import mongoose from "mongoose";
import "./GameModel";
import "./MoveModel";
const Game = mongoose.model("Game");
const Move = mongoose.model("Move");

/*
  Require Auth
*/
import { requireAuth } from "../auth/authHelpers";
gameRouter.use(requireAuth);

// Get all player's games
gameRouter.get(route("viewGames"), async (req, res) => {
  const games = await Game.find({ users: [req.user] });
  res.status(200).json(games);
});

// Create Game
gameRouter.post(route("createGame"), async (req, res) => {
  const game = new Game({
    users: [req.user],
  });
  await game.save();
  res.status(200).json(game);
});

// Join Game

// Start Game

/*
  Require in game
*/

// Get game

// Start game (player 1 only)

// Make move

/*
  Testing
*/

import game from "./mock-game.json";
gameRouter.get(route("viewGame"), async (req, res) => {
  const data = game;
  const { user } = req;
  res.status(200).json({ ...data, user });
});

export default gameRouter;
