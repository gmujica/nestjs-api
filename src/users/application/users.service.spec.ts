import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../infrastructure/entity/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findall', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: '1', name: 'User 1', email: 'user1@example.com', created_at: new Date(), updated_at: new Date() },
        { id: '2', name: 'User 2', email: 'user2@example.com', created_at: new Date(), updated_at: new Date() },
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await service.findall();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user when a valid user ID is provided', async () => {
      const userId = '1';
      const user: User = { id: userId, name: 'User 1', email: 'user1@example.com', created_at: new Date(), updated_at: new Date() };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(userId);
      expect(result).toEqual(user);
    });

    it('should return null when user is not found', async () => {
      const userId = 'invalid-user-id';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne(userId);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const newUser: User = { id: '1', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date() };
      const createdUser: User = { id: '3', name: 'New User', email: 'newuser@example.com', created_at: new Date(), updated_at: new Date() };

      jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

      const result = await service.create(newUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update an existing user and return it', async () => {
      const userId = '1';
      const updatedUser: User = { id: userId, name: 'Updated User', email: 'updateduser@example.com', created_at: new Date(), updated_at: new Date() };

      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(updatedUser);

      const result = await service.update(userId, updatedUser);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete the user with the provided ID', async () => {
      const userId = '1';

      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      await expect(service.delete(userId)).resolves.toBeUndefined();
      expect(userRepository.delete).toHaveBeenCalledWith(userId);
    });
  });
});
