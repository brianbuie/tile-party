import path from "path";
import express from "express";
import api from "./api/api";

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());

app.use("/api", api);

app.use(express.static(".build"));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, ".build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
