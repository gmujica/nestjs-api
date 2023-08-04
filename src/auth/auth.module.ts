import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from '../auth/application/auth.service';
import { UsersService } from '../users/application/users.service';
//import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  //controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
