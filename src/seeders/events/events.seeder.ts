import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../../events/events.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class EventSeeder {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async seed() {
    // Clear the existing data
    await this.eventModel.deleteMany();

    // Generate dummy events
    const events = Array.from({ length: 10 }, () => ({
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      date: faker.date.future(),
      participants: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        date: faker.date.past(),
      })),
    }));

    // Insert events into the database
    await this.eventModel.insertMany(events);
    console.log('Seeded 10 dummy events!');
  }
}
