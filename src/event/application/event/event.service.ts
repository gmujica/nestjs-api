import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from '../../infrastructure/entity/event.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) {}
    //get all events
    async findAll(/*event_id: string*/): Promise<Event[]> {
        return await this.eventRepository.find();

        /*const events = await this.eventRepository.find({
            relations: [''], loadRelationIds: false,
            where: {event_id: event_id}
        })
        return events;*/
    }
    //get one event
    async findOne(event_id: string): Promise<Event> {
        return await this.eventRepository.findOne({ where : { event_id }});
   }
   //create event
   async create(event: Event): Promise<Event> {
        const newEvent = this.eventRepository.create(event);

        return await this.eventRepository.save(newEvent);
    }
}
