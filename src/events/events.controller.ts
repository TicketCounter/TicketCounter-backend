import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { eventDto } from './DTOs/event.dto';
import { ParticipantDto } from './DTOs/participant.dto';
import { Post, Body, Put, Delete } from '@nestjs/common';


@Controller('events')
export class EventsController {
    constructor( private readonly eventsService: EventsService) {}

    @Post('create')
    async createEvent(@Body() eventDto: eventDto) {
        return this.eventsService.createEvent(eventDto);
    }

    @Delete('delete')
    async deleteEvent(@Body() id: string) {
        return this.eventsService.delete(id);
    }

    @Put('update')
    async updateEvent(@Body() id: string, @Body() eventDto) {
        return this.eventsService.update(id, eventDto);
    }

    @Post('addParticipant')
    async addParticipant(@Body() id: string, @Body() participantDto: ParticipantDto ) {
            return this.eventsService.addParticipant(id, participantDto.name, participantDto.phone);
        }

    @Delete('removeParticipant')
    async removeParticipant(@Body() id: string, @Body() participantId: string) {
        return this.eventsService.removeParticipant(id, participantId);
    }

    @Get('/')
    async findAll() {
        return this.eventsService.findAll();
    }

    @Get('findOne')
    async findOne(@Body() id: string) {
        return this.eventsService.findOne(id);
    }

}
