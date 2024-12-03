import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Participant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  date: Date;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: Date.now })
  creation_date: Date;

  @Prop({ type: [ParticipantSchema], default: [] })
  participants: Participant[];
}

export const EventSchema = SchemaFactory.createForClass(Event);