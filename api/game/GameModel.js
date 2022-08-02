import { model, Schema } from "mongoose";

const GameSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  started: Date,
  finished: Date,
  boardLayout: {
    type: String,
    enum: ["FRIENDLY"],
    default: "FRIENDLY",
  },
  gameMode: {
    type: String,
    enum: ["FRIENDLY"],
    default: "FRIENDLY",
  },
  racks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      tiles: [String],
    },
  ],
  moves: [
    {
      type: Schema.Types.ObjectId,
      ref: "Move",
    },
  ],
});

export default model("Game", GameSchema);
