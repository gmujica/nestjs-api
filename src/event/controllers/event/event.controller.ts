import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EventService } from '../../application/event/event.service';
import { Event } from '../../infrastructure/entity/event.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  //get all events
  @Get()
  @ApiTags('Event')
  async findAll(): Promise<Event[]> {
    return await this.eventService.findAll();
  }

  //get one event
  @Get(':id')
  @ApiTags('Event')
  async findOne(@Param('id') event_id: string): Promise<Event | null> {
    const event = await this.eventService.findOne(event_id);
    return event ? event : null;
  }

  //create event
  @Post()
  @ApiTags('Event')
  @ApiBody({
    type: Event,
    description: 'Create Event',
    examples: {
      user: {
        summary: 'Create event',
        description: 'Create Event',
        value: {
          title: 'event1',
          descrption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          id: 'User ID',
        },
      },
    },
  })
  async create(@Body() event: Event): Promise<Event> {
    return await this.eventService.create(event);
  }
}
