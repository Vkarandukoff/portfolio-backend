import { IntTimestampDto } from './defaults/int-timestamp.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserDto extends IntTimestampDto {
  @ApiProperty({
    name: 'username',
    description: 'user email',
    example: 'user@example.com',
    type: String,
    maxLength: 50,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 50)
  username: string;

  @ApiProperty({
    name: 'password',
    description: 'user password',
    example: 'pass1234',
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 100)
  password: string;

  @ApiProperty({
    name: 'password',
    description: 'user password',
    example: 'pass1234',
    type: String,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
