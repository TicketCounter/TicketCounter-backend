import { IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class ParticipantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  readonly name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;
}