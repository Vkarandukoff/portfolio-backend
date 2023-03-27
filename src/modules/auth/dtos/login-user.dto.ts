import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../../dtos/user.dto';

export class LoginUserDto extends PickType(UserDto, ['username', 'password']) {}
