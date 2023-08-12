import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { User } from 'src/users/infrastructure/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
  async login(@Body() user: UserWithoutPassword): Promise<{ access_token: string }> {
    const token = await this.authService.login(user);

    if (!token) {
      throw new HttpException('Unable to generate access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return token;
  }
}
