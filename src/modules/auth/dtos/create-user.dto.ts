import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../../dtos/user.dto';

export class CreateUserDto extends PickType(UserDto, ['username', 'password']) {}
