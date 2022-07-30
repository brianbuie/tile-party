import express from "express";

const api = express.Router();

api.get("/hello", async (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

export default api;
