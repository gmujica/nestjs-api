import { Controller, Get, Post, Param, Body, Delete, NotFoundException, Put } from '@nestjs/common';
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
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          "user": {
            "id": "User ID"
          }
        },
      },
    },
  })
  
  async create(@Body() event: Event): Promise<Event> {
    const userId = event.user.id;
    return await this.eventService.create(event, userId);
  }
  //find by userId
  @Get('user/:userId')
    @ApiTags('Event')
    async findByUserId(@Param('userId') userId: string): Promise<Event[]> {
        return await this.eventService.findEventsByUserId(userId);
    }
  // update event by ID
  @Put(':id')
  @ApiTags('Event')
  async update(@Param('id') event_id: string, @Body() updatedEvent: Event): Promise<Event | NotFoundException> {
      try {
          return await this.eventService.updateEvent(event_id, updatedEvent);
      } catch (error) {
          if (error instanceof NotFoundException) {
              throw error;
          }
          throw new NotFoundException(`Event with ID ${event_id} not found.`);
      }
  }

  // delete event by ID
  @Delete(':id')
  @ApiTags('Event')
  async remove(@Param('id') event_id: string): Promise<void | NotFoundException> {
      try {
          await this.eventService.deleteEvent(event_id);
      } catch (error) {
          if (error instanceof NotFoundException) {
              throw error;
          }
          throw new NotFoundException(`Event with ID ${event_id} not found.`);
      }
  }
}
