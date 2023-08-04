import { Controller, Get, Post, Param,Delete, Put, Body, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { any } from 'joi';
import { User } from '../infrastructure/entity/user.entity';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from '../infrastructure/dto/CreateUserDto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    //get all users
    @Get()
    @ApiTags('users')
    async findAll(): Promise<User[]> {
        return await this.userService.findall();
    }
    //get one user
    @Get(':id')
    @ApiTags('users')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.userService.findOne(id);
        if(!user) {
            throw new Error('User not found');
        } else {
            return user;
        }
    }
    // create user
    @Post()
    @ApiTags('users')
    @ApiBody({
        type: any,
        description: 'Create user',
        examples: {
            user: {
                summary: 'Create user',
                description: 'Create user',
                value: {
                    "name": "ada",
                    "email": "ada@mail.com",
                    "password": "password123" // Replace "password123" with the actual password value
                },
            },
        },
    })

    /*async create(@Body() user: User): Promise<User> {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds (you can adjust it as per your preference)
        user.password = hashedPassword;
        
        return await this.userService.create(user);
    }*/
   @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user: User = {
      id: undefined,
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
      events: [], 
      //hashPassword: undefined,
    };

    return this.userService.create(user);
  }
    // get by email *(for login)
    @Get('email/:email')
    @ApiTags('users')
    async findByEmail(@Param('email') email: string): Promise<User | undefined> {
        return this.userService.findByEmail(email);
    }
    //update user
    @Put(':id')
    @ApiTags('users')
    async update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }
    //delete user
    @Delete(':id')
    @ApiTags('users')
    async delete(@Param('id') id: string): Promise<void> {
        //handle the error if user not found
        const user = await this.userService.findOne(id);
        if(!user) {
            throw new Error('user not found');
        }
        return this.userService.delete(id);
    } 
}
