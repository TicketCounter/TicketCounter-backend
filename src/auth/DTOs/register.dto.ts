import { IsEmail, IsString, MinLength, IsPhoneNumber, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  firstname: string;

  @IsString()
  @MinLength(3)
  @MaxLength(25)
  lastname: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;
}