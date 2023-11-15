import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class LogDto {
  @IsString()
  @IsNotEmpty()
  Messaggio: string;

  @IsString()
  @IsNotEmpty()
  Timestamp: Date;

  @IsString()
  @IsNotEmpty()
  EndpointUrl: string;
}
