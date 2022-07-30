import dotenv from "dotenv";
import path from "path";
import express from "express";
import router from "./api/router";

// Only load env file if not already defined
if (!process.env.NODE_ENV) dotenv.config();
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

app.use(express.json());

app.use("/api", router);

app.use(express.static(".build"));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, ".build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
