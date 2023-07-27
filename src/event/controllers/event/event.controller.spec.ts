import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from '../../application/event/event.service';
import { Event } from '../../infrastructure/entity/event.entity';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const events: Event[] = [
        { event_id: '1', title: 'Event 1', descrption: 'Description 1', id: 'user1', created_at: new Date(), updated_at: new Date() },
        { event_id: '2', title: 'Event 2', descrption: 'Description 2', id: 'user2', created_at: new Date(), updated_at: new Date() },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(events);

      const result = await controller.findAll();
      expect(result).toEqual(events);
    });
  });

  describe('findOne', () => {
    it('should return a single event when a valid event_id is provided', async () => {
      const eventId = '1';
      const event: Event = {
        event_id: eventId,
        title: 'Event 1',
        descrption: 'Description 1',
        id: 'user1',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(event);

      const result = await controller.findOne(eventId);
      expect(result).toEqual(event);
    });

    it('should throw an error when event is not found', async () => {
      const eventId = 'invalid-event-id';
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(eventId)).rejects.toThrow('Event not found');
    });
  });

  describe('create', () => {
    it('should create a new event and return it', async () => {
      const newEvent: Event = {
        title: 'New Event',
        descrption: 'New Description',
        event_id: 'user3',
        id: 'id1',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const createdEvent: Event = {
        event_id: '3',
        title: 'New Event',
        descrption: 'New Description',
        id: 'user3',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdEvent);

      const result = await controller.create(newEvent);
      expect(result).toEqual(createdEvent);
    });
  });
});
