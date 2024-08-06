import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User{
  @Prop()
  name: string;
  @Prop()
  document: string;
  @Prop()
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);