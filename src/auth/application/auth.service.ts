import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/application/users.service';
import { User } from '../../users/infrastructure/entity/user.entity';

interface UserWithoutPassword {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
  }
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
    // Find the user by email (assuming the email is unique)
    const user = await this.usersService.findByEmail(email);
  
    if (user && (await bcrypt.compare(password, user.password))) {
      // Password matches, return the user without the password
      const { password, ...result } = user;
      return result;
    }
    // If the user or password is invalid, return null
    return null;
  }
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
