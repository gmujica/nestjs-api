import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../infrastructure/entity/event.entity';

describe('EventService', () => {
  let service: EventService;
  let eventRepository: Repository<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const events: Event[] = [
        {
          event_id: '1',
          title: 'Event 1',
          descrption: 'Description 1',
          //id: '1',
          created_at: new Date(),
          updated_at: new Date(),
          user: { id: '1', name: 'John Doe', email: 'john@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
        },
        {
          event_id: '2',
          title: 'Event 2',
          descrption: 'Description 2',
          //id: '2',
          created_at: new Date(),
          updated_at: new Date(),
          user: { id: '2', name: 'Jane Doe', email: 'jane@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
        },
      ];
      jest.spyOn(eventRepository, 'find').mockResolvedValue(events);

      const result = await service.findAll();
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
        descrption: 'Description 1',
        //id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        user,
      };
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(event);

      const result = await service.findOne(eventId);
      expect(result).toEqual(event);
    });

    it('should return null when event is not found', async () => {
      const eventId = 'invalid-event-id';
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne(eventId);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new event and return it', async () => {
      const newEvent: Event = {
        event_id: '1',
        title: 'New Event',
        descrption: 'New Description',
        //id: '3',
        created_at: new Date(),
        updated_at: new Date(),
        user: { id: '3', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
      };
      const createdEvent: Event = {
        event_id: '3',
        title: 'New Event',
        descrption: 'New Description',
        //id: '3',
        created_at: new Date(),
        updated_at: new Date(),
        user: { id: '3', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
      };

      jest.spyOn(eventRepository, 'create').mockReturnValue(newEvent);
      jest.spyOn(eventRepository, 'save').mockResolvedValue(createdEvent);

      const result = await service.create(newEvent);
      expect(result).toEqual(createdEvent);
    });
  });
});
