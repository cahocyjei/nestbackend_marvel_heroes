import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, SchemaTypes } from "mongoose";

export type ComicsDocument = HydratedDocument<ListComic>

@Schema()
export class ListComic {
  @Prop()
  nameList: string
  @Prop()
  idUser: string
  @Prop()
  idComic: string
  @Prop()
  name: string;
  @Prop()
  description: string
  @Prop()
  image: string;
}
export const ListComicSchema = SchemaFactory.createForClass(ListComic);