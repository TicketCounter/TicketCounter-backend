import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { IsFutureDate } from '../validators/future-date.decorator';

export class eventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(10)
  readonly description: string;

  @IsNotEmpty()
  @IsFutureDate({ message: 'Date must be in the future' })
  @Type(() => Date)
  readonly date: Date;
}