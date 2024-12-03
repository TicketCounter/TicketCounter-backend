import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../auth/auth.schema';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserSeeder {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seed() {
    await this.userModel.deleteMany();

    const users = await Promise.all(
      Array.from({ length: 10 }, async () => ({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        role: 'organizer',
        created_at: faker.date.past(),
      }))
    );

    await this.userModel.insertMany(users);
    console.log('Seeded 10 dummy users!');
  }
}