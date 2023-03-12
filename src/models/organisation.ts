import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IAgent {
  _id: mongoose.Types.ObjectId;
  name: string;
  logoUrl: string;
  address: string;
  description: string;
}

const Organisation = new Schema<IAgent>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'organisation',
  }
);

export const OrganisationModel = mongoose.model<IAgent>(
  'Organisation',
  Organisation
);
