import { Types } from "mongoose";
export default interface IServiceRequest {
  title: string;
  description: string;
  location: string;
  images: string[];
  userId: Types.ObjectId;
  professionalId: string;
}
