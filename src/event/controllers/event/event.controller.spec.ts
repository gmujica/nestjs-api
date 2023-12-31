import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from '../../application/event/event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../infrastructure/entity/event.entity';

describe('EventController', () => {
  let controller: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const events: Event[] = [
        {
          event_id: '1',
          title: 'Event 1',
          description: 'Description 1',
          //id: '1',
          created_at: new Date(),
          updated_at: new Date(),
          user: { id: '1', name: 'John Doe', email: 'john@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
        },
        {
          event_id: '2',
          title: 'Event 2',
          description: 'Description 2',
          //id: '2',
          created_at: new Date(),
          updated_at: new Date(),
          user: { id: '2', name: 'Jane Doe', email: 'jane@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
        },
      ];
      jest.spyOn(eventService, 'findAll').mockResolvedValue(events);

      const result = await controller.findAll();
      expect(result).toEqual(events);
    });
  });

  describe('findOne', () => {
    it('should return a single event when a valid event_id is provided', async () => {
      const eventId = '1';
      const user = { id: '1', name: 'John Doe', email: 'john@example.com', created_at: new Date(), updated_at: new Date(), events: [] };
      const event: Event = {
        event_id: eventId,
        title: 'Event 1',
        description: 'Description 1',
        //id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        user,
      };
      jest.spyOn(eventService, 'findOne').mockResolvedValue(event);

      const result = await controller.findOne(eventId);
      expect(result).toEqual(event);
    });

    it('should return null when event is not found', async () => {
      const eventId = 'invalid-event-id';
      jest.spyOn(eventService, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne(eventId);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new event and return it', async () => {
      const newEvent: Event = {
        event_id: '1',
        title: 'New Event',
        description: 'New Description',
        //id: '3',
        created_at: new Date(),
        updated_at: new Date(),
        user: { id: '3', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
      };
      const createdEvent: Event = {
        event_id: '3',
        title: 'New Event',
        description: 'New Description',
        //id: '3',
        created_at: new Date(),
        updated_at: new Date(),
        user: { id: '3', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
      };

      jest.spyOn(eventService, 'create').mockResolvedValue(createdEvent);

      const result = await controller.create(newEvent);
      expect(result).toEqual(createdEvent);
    });
  });
});
