import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException('Failed to validate password');
    }
  }

  async generateToken(user: { _id: any; email: string }): Promise<string> {
    try {
      const payload = { sub: user._id.toString(), email: user.email };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate token');
    }
  }

  async register(firstname: string, lastname: string, email: string,phone: string, password: string ): Promise<User> {

    if (!firstname || !lastname || !phone || !email || !password) {
      throw new BadRequestException('Missing user information');
    }
  
    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }
  
    try {
      const hashedPassword = await this.hashPassword(password);
      const newUser = new this.userModel({ firstname, lastname, email, phone, password: hashedPassword });
      return await newUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await this.validatePassword(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = await this.generateToken({ _id: user._id, email: user.email });
      return { user, token };
    } catch (error) {
      throw error instanceof UnauthorizedException
        ? error
        : new InternalServerErrorException('Failed to login');
    }
  }

  async findOne(key: keyof User, value: any): Promise<User> {
    try {
      const user = await this.userModel.findOne({ [key]: value });
      if (!user) {
        throw new NotFoundException(`User with ${key} ${value} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async update(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true },
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      const result = await this.userModel.findByIdAndDelete(userId);
      if (!result) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

}