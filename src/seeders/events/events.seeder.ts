import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../../events/events.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class EventSeeder {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async seed() {
    await this.eventModel.deleteMany();

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

    await this.eventModel.insertMany(events);
    console.log('Seeded 10 dummy events!');
  }
}
