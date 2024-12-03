import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTOs/register.dto';
import { LoginDto } from './DTOs/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a user', async () => {
      const dto: RegisterDto = { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password' };
      await authController.register(dto);
      expect(authService.register).toHaveBeenCalledWith(dto.firstname, dto.lastname, dto.email, dto.phone, dto.password);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const dto: LoginDto = { email: 'john.doe@example.com', password: 'password' };
      await authController.login(dto);
      expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });
});