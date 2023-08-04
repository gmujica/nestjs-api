import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../infrastructure/entity/user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    //get all users
    async findall(): Promise<User[]> {
        return await this.usersRepository.find();
    }
    //get one user
    async findOne(id: string): Promise<User> {
         return await this.usersRepository.findOne({ where : { id }});
    }
    //find by email
    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
      }
    async create(user: User): Promise<User> {
        // Hash the password before saving
        user.password = await bcrypt.hash(user.password, 10);
    
        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
      }
    //update user
    async update(id: string, user: User): Promise<User> {
        await this.usersRepository.update(id, user);

        return await this.usersRepository.findOne( {where : {id}});
    }
    //delete
    async delete(id: string): Promise<void>{
        await this.usersRepository.delete(id);

    }
}
