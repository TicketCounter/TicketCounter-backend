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
    // Clear existing users data
    await this.userModel.deleteMany();

    // Generate dummy users
    const users = await Promise.all(
      Array.from({ length: 10 }, async () => ({
        name: faker.person.fullName(),
        role: faker.helpers.arrayElement(['admin', 'organizer', 'participant']),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
      }))
    );

    // Insert users into the database
    await this.userModel.insertMany(users);
    console.log('Seeded 10 dummy users!');
  }
}