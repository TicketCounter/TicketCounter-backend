import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../auth/auth.schema';
import { UserSeeder } from './users.seeder';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserSeeder],
  exports: [UserSeeder],
})
export class SeederModule {}
