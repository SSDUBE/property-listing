import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IAgent {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  profileImageUrl: string;
}

const Agent = new Schema<IAgent>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    profileImageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'agent',
  }
);

export const AgentModel = mongoose.model<IAgent>('Agent', Agent);
