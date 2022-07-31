import dotenv from "dotenv";
// Only load env file if not already defined
if (!process.env.NODE_ENV) dotenv.config();

import path from "path";
import express from "express";
import passport from "passport";
import session from "express-session";
import router from "./api/router";
import { passportInit } from "./api/auth";

const { PORT, NODE_ENV } = process.env;

const app = express();

// Redirect to https
app.use((req, res, next) => {
  const notProd = NODE_ENV !== "production";
  const isLocalhost = req.socket.localAddress === req.socket.remoteAddress;
  const isHttps = req.header("x-forwarded-proto") === "https";
  if (notProd || isLocalhost || isHttps) return next();
  res.redirect(`https://${req.header("host")}${req.url}`);
});

// Auth
passportInit();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

// Static files and everything else to react
app.use(express.static(".build"));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, ".build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
