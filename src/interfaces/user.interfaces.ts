import { ObjectId } from "mongoose";

export interface UserI{
  _id: ObjectId;
  name: string;
  document: string;
  email: string;
}