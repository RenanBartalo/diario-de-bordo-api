import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    active: { type: Boolean, default: true },
    travels: [{ type: Schema.Types.ObjectId, ref: 'travel', default: [] }],
    photo: { type: String },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = model('user', userSchema);

export default User;
