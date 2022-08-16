import { model, Schema } from 'mongoose';

const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ['facebook'],
  },
  type: {
    type: String,
    required: true,
    enum: ['oauth'],
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  accessToken: String,
  refreshToken: String,
  expiresAt: Number,
});

export default model('Account', AccountSchema);
