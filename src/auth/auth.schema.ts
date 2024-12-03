import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ default: 'organizator' })
  role: string;

  @Prop({ default: Date.now })
  created_at: Date;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);