import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../application/users.service';
import { User } from '../infrastructure/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: '1', name: 'User 1', email: 'user1@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
        { id: '2', name: 'User 2', email: 'user2@example.com', created_at: new Date(), updated_at: new Date(), events: [] },
      ];
      jest.spyOn(userService, 'findall').mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user when a valid user ID is provided', async () => {
      const userId = '1';
      const user: User = {
        id: userId, name: 'User 1', email: 'user1@example.com', created_at: new Date(), updated_at: new Date(),
        events: []
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(userId);
      expect(result).toEqual(user);
    });

    it('should throw an error when user is not found', async () => {
      const userId = 'invalid-user-id';
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(userId)).rejects.toThrow('User not found');
    });
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const newUser: User = {
        id: '1', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date(),
        events: []
      };
      const createdUser: User = {
        id: '3', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date(),
        events: []
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(newUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update an existing user and return it', async () => {
      const userId = '1';
      const updatedUser: User = {
        id: userId, name: 'Updated User', email: 'updateduser@example.com', created_at: new Date(), updated_at: new Date(),
        events: []
      };

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updatedUser);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete the user with the provided ID', async () => {
      const userId = '1';

      jest.spyOn(userService, 'findOne').mockResolvedValue({ id: userId, name: 'User', email: 'user@example.com', created_at: new Date(), updated_at: new Date(), events: [] });
      jest.spyOn(userService, 'delete').mockResolvedValue(undefined);

      await expect(controller.delete(userId)).resolves.toBeUndefined();
      expect(userService.delete).toHaveBeenCalledWith(userId);
    });
    it('should throw an error when user is not found', async () => {
      const userId = 'invalid-user-id';
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(controller.delete(userId)).rejects.toThrow(/user not found/i);
    });
  });
});
