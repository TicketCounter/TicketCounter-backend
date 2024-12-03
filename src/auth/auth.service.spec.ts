import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let model: jest.Mocked<Model<UserDocument>>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get(getModelToken(User.name));
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw BadRequestException if user information is missing', async () => {
      await expect(service.register('', '', '', '', '')).rejects.toThrow(BadRequestException);
    });

    it('should throw UnauthorizedException if email is already in use', async () => {
      model.findOne.mockResolvedValueOnce({} as UserDocument);
      await expect(service.register('John', 'Doe', 'test@example.com', '1234567890', 'password')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      model.findOne.mockResolvedValueOnce(null);
      await expect(service.login('test@example.com', 'password')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      model.findOne.mockResolvedValueOnce({ password: 'hashedPassword' } as UserDocument);
      jest.spyOn(service, 'validatePassword').mockResolvedValueOnce(false);
      await expect(service.login('test@example.com', 'password')).rejects.toThrow(UnauthorizedException);
    });

    it('should return a token if credentials are valid', async () => {
      model.findOne.mockResolvedValueOnce({
        _id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as UserDocument);
      jest.spyOn(service, 'validatePassword').mockResolvedValueOnce(true);
      const result = await service.login('test@example.com', 'password');
      expect(result).toEqual({ token: 'token' });
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if user is not found', async () => {
      model.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne('email', 'test@example.com')).rejects.toThrow(NotFoundException);
    });

    it('should return a user if found', async () => {
      const user = { email: 'test@example.com' } as UserDocument;
      model.findOne.mockResolvedValueOnce(user);
      const result = await service.findOne('email', 'test@example.com');
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if user is not found', async () => {
      model.findByIdAndUpdate.mockResolvedValueOnce(null);
      await expect(service.update('1', { email: 'new@example.com' })).rejects.toThrow(NotFoundException);
    });

    it('should update and return the user', async () => {
      const user = { email: 'new@example.com' } as UserDocument;
      model.findByIdAndUpdate.mockResolvedValueOnce(user);
      const result = await service.update('1', { email: 'new@example.com' });
      expect(result).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should throw NotFoundException if user is not found', async () => {
      model.findByIdAndDelete.mockResolvedValueOnce(null);
      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
    });

    it('should delete the user', async () => {
      model.findByIdAndDelete.mockResolvedValueOnce({} as UserDocument);
      await expect(service.delete('1')).resolves.toBeUndefined();
    });
  });
describe('delete', () => {
describe('findOne', () => {
  it('should throw NotFoundException if user is not found', async () => {
    model.findOne.mockResolvedValueOnce(null);
    await expect(service.findOne('email', 'test@example.com')).rejects.toThrow(NotFoundException);
  });

  it('should return a user if found', async () => {
    const user = { email: 'test@example.com' } as UserDocument;
    model.findOne.mockResolvedValueOnce(user);
    const result = await service.findOne('email', 'test@example.com');
    expect(result).toEqual(user);
  });
});
});
});
