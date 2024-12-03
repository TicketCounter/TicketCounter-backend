import { Controller, Get, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { eventDto } from './DTOs/event.dto';
import { ParticipantDto } from './DTOs/participant.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createEvent(@Body() eventDto: eventDto) {
    return this.eventsService.createEvent(eventDto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async deleteEvent(@Body() id: string) {
    return this.eventsService.delete(id);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateEvent(@Body() body: { eventId: string; values: eventDto }) {
    const { eventId, values } = body;
    return this.eventsService.update(eventId, values);
  }

  @Post('addParticipant')
  @UseGuards(JwtAuthGuard)
  async addParticipant(@Body() body: { id: string; participant: ParticipantDto }) {
    const { id, participant } = body;
    return this.eventsService.addParticipant(id, participant.name, participant.phone);
  }

  @Post('removeParticipant')
  @UseGuards(JwtAuthGuard)
  async removeParticipant(@Body() body: { id: string; participantId: string }) {
    const { id, participantId } = body;
    return this.eventsService.removeParticipant(id, participantId);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findAll() {

    return this.eventsService.findAll();
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getStats() {
    return this.eventsService.getStats();
  }
}