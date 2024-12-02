import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from './events.schema';
// import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    // private authService: AuthService
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

  async update(id: string, eventDto): Promise<Event> {
    try {
      return await this.eventModel.findByIdAndUpdate(id, eventDto, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error updating event: ${error.message}`);
    }
  }

  async delete(id: string): Promise<Event> {
    try {
      return await this.eventModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  }

  async addParticipant(id: string, name: string, phone: string): Promise<Event> {
    try {
      const objectId = new Types.ObjectId(id);
      const participantToAdd = {
        id: new Types.ObjectId(),
        name: name,
        phone: phone,
        date: new Date(),
      };

      return await this.eventModel.findByIdAndUpdate(objectId, { $push: { participants: participantToAdd } }, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error adding participant: ${error.message}`);
    }
  }

  async removeParticipant(id: string, participantId: string): Promise<Event> {
    try {
      const objectId = new Types.ObjectId(id);
      const participantObjectId = new Types.ObjectId(participantId);

      const event = await this.eventModel.findById(objectId).exec();
      if (!event) {
        throw new Error('Event not found');
      }

      const participantIndex = event.participants.findIndex((participant: any) => participant.id.equals(participantObjectId));
      if (participantIndex === -1) {
        throw new Error('Participant not found');
      }

      event.participants.splice(participantIndex, 1);
      return await event.save();
    } catch (error) {
      throw new Error(`Error removing participant: ${error.message}`);
    }
  }
}