import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  image: String,
});

const conversionOptions = {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted.email;
  },
};

UserSchema.set('toObject', conversionOptions);
UserSchema.set('toJSON', conversionOptions);

export default model('User', UserSchema);
