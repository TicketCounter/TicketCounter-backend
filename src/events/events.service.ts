import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './events.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(eventDto): Promise<Event> {
    const newEvent = new this.eventModel(eventDto);
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async update(id: string, eventDto): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, eventDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}