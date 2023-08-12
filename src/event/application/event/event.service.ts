import { Injectable, NotFoundException } from '@nestjs/common';
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
            relations: ['user'],
        });
   }
   //create event
   async create(event: Event): Promise<Event> {
        const newEvent = this.eventRepository.create(event);
        const savedEvent = await this.eventRepository.save(newEvent);
        return await this.eventRepository.save(savedEvent);
    }
    //update event
    async updateEvent(event_id: string, updatedEvent: Event): Promise<Event> {
        const existingEvent = await this.findOne(event_id);
        if (!existingEvent) {
            throw new NotFoundException(`Event with ID ${event_id} not found.`);
        }
        const mergedEvent = this.eventRepository.merge(existingEvent, updatedEvent);
        return await this.eventRepository.save(mergedEvent);
    }
    //delete event
    async deleteEvent(event_id: string): Promise<void> {
        const existingEvent = await this.findOne(event_id);
        if (!existingEvent) {
            throw new NotFoundException(`Event with ID ${event_id} not found.`);
        }
        await this.eventRepository.remove(existingEvent);
    }

}