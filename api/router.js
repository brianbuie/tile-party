/*
  Init
*/
import express from "express";
const router = express.Router();

/*
  Auth
*/
import authRouter from "./auth/authRouter";
router.use(authRouter);

/*
  Temp game router
*/
import fs from "fs";
import routes from "../common/routes";
const route = name => routes[name].replace("/api", "");

router.get(route("fetchGame"), async (req, res) => {
  const data = JSON.parse(fs.readFileSync(__dirname + "/mock-game.json"));
  const { user } = req;
  res.status(200).json({ ...data, user });
});

/*
  Error handling
*/
router.use((err, req, res, next) => {
  console.error(err);
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) return res.status(500).json({ message: "Something went wrong" });
  res.status(500).json(err);
});

router.use((req, res, next) => res.status(404).json({ message: "Not found" }));

export default router;
