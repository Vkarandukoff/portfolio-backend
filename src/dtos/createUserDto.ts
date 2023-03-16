import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Only e-mail',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
