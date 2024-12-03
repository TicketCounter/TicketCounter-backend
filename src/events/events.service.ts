import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, Participant } from './events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async createEvent(createEventDto: any): Promise<Event> {
    try {
      const newEvent = new this.eventModel(createEventDto);
      return await newEvent.save();
    } catch (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      return await this.eventModel.find().exec();
    } catch (error) {
      throw new Error(`Error finding events: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      return await this.eventModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Error finding event: ${error.message}`);
    }
  }

  async update(id: string, newEvent: object): Promise<Event> {
    try {
      const eventId = new Types.ObjectId(id);
      return await this.eventModel.findByIdAndUpdate(eventId, newEvent, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error updating event: ${error.message}`);
    }
  }

  async addParticipant(id: string, name: string, phone: string): Promise<Event[]> {
    try {
      const objectId = new Types.ObjectId(id);
      const participantToAdd: Participant = {
        name: name,
        phone: phone,
        date: new Date(),
      };
  
      const updatedEvent = await this.eventModel.findByIdAndUpdate(
        objectId,
        { $push: { participants: participantToAdd } },
        { new: true, useFindAndModify: false }
      ).exec();

      const events = await this.eventModel.find().exec();
  
      if (!updatedEvent) {
        throw new Error('Event not found');
      }
  
      return events;
    } catch (error) {
      throw new Error(`Error adding participant: ${error.message}`);
    }
  }

  async removeParticipant(id: string, participantId: string): Promise<Event[]> {
    try {
      const objectId = new Types.ObjectId(id);
      const participantObjectId = new Types.ObjectId(participantId);
      const updatedEvent =  await this.eventModel.findByIdAndUpdate(
        objectId,
        { $pull: { participants: { _id: participantObjectId } } },
        { new: true }
      ).exec();

      const events = await this.eventModel.find().exec();

      if (!updatedEvent) {
        throw new Error('Event not found');
      }

      return events;
    } catch (error) {
      throw new Error(`Error removing participant: ${error.message}`);
    }
  }

  async getStats(): Promise<any> {
    try {
      const now = new Date();
  
      const totalEvents = await this.eventModel.countDocuments().exec();
  
      const totalParticipants = await this.eventModel.aggregate([
        { $unwind: '$participants' },
        { $count: 'count' },
      ]).exec();
  
      const totalActiveEvents = await this.eventModel.countDocuments({ date: { $gte: now } }).exec();
      const totalPassedEvents = await this.eventModel.countDocuments({ date: { $lt: now } }).exec();
  
      return {
        totalEvents,
        totalParticipants: totalParticipants[0]?.count || 0,
        totalActiveEvents,
        totalPassedEvents,
      };
    } catch (error) {
      throw new Error(`Error getting stats: ${error.message}`);
    }
  }
}