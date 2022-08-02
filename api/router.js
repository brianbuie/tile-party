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
  Game
*/
import gameRouter from "./game/gameRouter";
router.use("/game", gameRouter);

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
