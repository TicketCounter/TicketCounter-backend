import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../../events/events.schema';
import { EventSeeder } from './users.seeder';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  providers: [EventSeeder],
  exports: [EventSeeder],
})
export class SeederModule {}
