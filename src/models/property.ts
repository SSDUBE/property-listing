import mongoose from 'mongoose';
const { Schema } = mongoose;

interface IUnit {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  price: number;
}

export interface IProperty {
  _id: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: string;
  organisation: mongoose.Types.ObjectId;
  listingType: string;
  listingSector: string;
  unit: IUnit;
  images: string[];
}

const Property = new Schema<IProperty>(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    organisation: { type: mongoose.Schema.Types.ObjectId, required: true },
    listingType: { type: String, required: true },
    listingSector: { type: String, required: true },
    unit: { type: {}, required: true },
    images: { type: [], required: true },
  },
  {
    timestamps: true,
    collection: 'property',
  }
);

export const PropertyModel = mongoose.model<IProperty>(
  'Property',
  Property
);
