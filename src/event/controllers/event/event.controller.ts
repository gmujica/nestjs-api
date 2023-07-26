import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EventService } from 'src/event/application/event/event.service';
import { Event } from '../../infrastructure/entity/event.entity'

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    //get all events
    @Get()
    async findAll(): Promise<Event[]> {
        return await this.eventService.findAll();
    }
     //get one event
     @Get(':id')
     async findOne(@Param('event_id') event_id: string): Promise<Event> {
         const event = await this.eventService.findOne(event_id);
         if(!event) {
             throw new Error('Event not found');
         } else {
             return event;
         }
     }
     //create event
     @Post()
     async create(@Body() event: Event): Promise<Event> {
         return await this.eventService.create(event);
     }
}
