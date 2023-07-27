import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { User } from './users/infrastructure/entity/user.entity';
import { Event } from './event/infrastructure/entity/event.entity';

@Module({
  imports: [
    UsersModule,
    EventModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [User, Event],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
