import { Controller } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTOs/register.dto';
import { LoginDto } from './DTOs/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto.firstname, registerDto.lastname, registerDto.email, registerDto.phone, registerDto.password );
    }
}
