import express from "express";
import fs from "fs";
import routes from "../common/routes";
import authRouter from "./auth";

const router = express.Router();
const route = name => routes[name].replace("/api", "");

router.use("/auth", authRouter);

router.get(route("fetchGame"), async (req, res) => {
  const data = JSON.parse(fs.readFileSync(__dirname + "/mock-game.json"));
  res.status(200).json(data);
});

export default router;
