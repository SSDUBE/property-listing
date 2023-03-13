import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const User = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'user',
  }
);

export const UserModel = mongoose.model<IUser>('User', User);
