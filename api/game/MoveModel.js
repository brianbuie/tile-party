import { model, Schema } from 'mongoose';

const MoveSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    enum: ['WORDS', 'SWAP', 'PASS', 'RESIGN'],
  },
  score: Number,
  words: [String],
  tiles: [Schema.Types.Mixed],
});

export default model('Move', MoveSchema);
