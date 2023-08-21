import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; 

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'User Login' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unable to generate access token' })

    @Post('login')
  async login(@Body() user: UserWithoutPassword): Promise<{ access_token: string }> {
    const token = await this.authService.login(user);

    if (!token) {
      throw new HttpException('Unable to generate access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return token;
  }
}
