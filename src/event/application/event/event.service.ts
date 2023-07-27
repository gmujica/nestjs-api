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
    async findAll(): Promise<Event[]> {
        return await this.eventRepository.find();
    }
    //get one event
    async findOne(event_id: string): Promise<Event> {
        return await this.eventRepository.findOne({ 
            where : { event_id },
            relations: ['user'], // Include the 'user' relationship
        });
   }
   //create event
   async create(event: Event): Promise<Event> {
        const newEvent = this.eventRepository.create(event);

        return await this.eventRepository.save(newEvent);
    }
}
