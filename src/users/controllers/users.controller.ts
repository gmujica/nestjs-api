import { Controller, Get, Post, Param,Delete, Put, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { any } from 'joi';
import { User } from '../infrastructure/entity/user.entity';
import { UsersService } from '../application/users.service';

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
    //create user
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
                "email": "ada@mail.com"
            },
        },
        },
    })

    async create(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
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
