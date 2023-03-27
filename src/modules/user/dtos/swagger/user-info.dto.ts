import { OmitType } from '@nestjs/swagger';
import { UserDto } from '../../../../dtos/user.dto';

export class UserInfoDto extends OmitType(UserDto, ['portfolios', 'images']) {}
