import express from "express";
import fs from "fs";
import routes from "../common/routes";

const router = express.Router();

router.get(routes.GAME, async (req, res) => {
  const data = JSON.parse(fs.readFileSync(__dirname + "/mock-data/game.json"));
  res.status(200).json(data);
});

export default router;
