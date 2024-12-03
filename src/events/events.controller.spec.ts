import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { eventDto } from './DTOs/event.dto';
import { ParticipantDto } from './DTOs/participant.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './events.schema';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: jest.Mocked<EventsService>;

  beforeEach(async () => {
    const eventsServiceMock: Partial<jest.Mocked<EventsService>> = {
      createEvent: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      addParticipant: jest.fn(),
      removeParticipant: jest.fn(),
      getStats: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: eventsServiceMock,
        },
        {
          provide: getModelToken(Event.name),
          useValue: Model,
        },
        JwtAuthGuard,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
            verify: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    eventsController = module.get<EventsController>(EventsController);
    eventsService = module.get<any>(EventsService);
  });

  it('should be defined', () => {
    expect(eventsController).toBeDefined();
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      const dto: eventDto = { title: 'Test Event', description: 'Test Description', date: new Date() };
      await eventsController.createEvent(dto);
      expect(eventsService.createEvent).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      const id = 'someId';
      eventsService.delete.mockResolvedValueOnce({} as Event);
      await eventsController.deleteEvent(id);
      expect(eventsService.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('updateEvent', () => {
    it('should update an event', async () => {
      const body = { eventId: 'someId', values: { title: 'Updated Event', description: 'Updated Description', date: new Date() } };
      eventsService.update.mockResolvedValueOnce({} as Event);
      await eventsController.updateEvent(body);
      expect(eventsService.update).toHaveBeenCalledWith(body.eventId, body.values);
    });
  });

  describe('addParticipant', () => {
    it('should add a participant', async () => {
      const body = { id: 'someId', participant: { name: 'John Doe', phone: '1234567890' } };
      eventsService.addParticipant.mockResolvedValueOnce({} as Event[]);
      await eventsController.addParticipant(body);
      expect(eventsService.addParticipant).toHaveBeenCalledWith(body.id, body.participant.name, body.participant.phone);
    });
  });

  describe('removeParticipant', () => {
    it('should remove a participant', async () => {
      const body = { id: 'someId', participantId: 'participantId' };
      eventsService.removeParticipant.mockResolvedValueOnce([] as Event[]);
      const result = await eventsController.removeParticipant(body);
      expect(eventsService.removeParticipant).toHaveBeenCalledWith(body.id, body.participantId);
      expect(result).toEqual([]);
    });
  });

  describe('getStats', () => {
    it('should get stats', async () => {
      await eventsController.getStats();
      expect(eventsService.getStats).toHaveBeenCalled();
    });
  });
});