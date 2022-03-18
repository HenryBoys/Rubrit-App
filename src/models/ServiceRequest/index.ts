//from modules
import { model, models, Schema, Types } from "mongoose";
//interfaces
import type IServiceRequest from "./IServiceRequest";

//create user schema for db petitions
const serviceRequestSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      formattedAddress: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    images: Array,
    userId: {
      type: Types.ObjectId,
      required: true
    },
    professionalId: { type: Types.ObjectId, default: null },
    category: { type: Types.ObjectId, default: null },
    subcategory: { type: Types.ObjectId, default: null },
    isActive: {
      type: Boolean,
      required: true
    },
    contractId: Types.ObjectId,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default models?.ServiceRequest || model<IServiceRequest>("ServiceRequest", serviceRequestSchema);
