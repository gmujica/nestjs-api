import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './controllers/event/event.controller';
import { EventService } from './application/event/event.service';
import { Event } from './infrastructure/entity/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventController],
    providers: [EventService]
})
export class EventModule {}
