import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from '../../../../dtos/user.dto';

export class JwtTokensApiResponseDto extends PickType(UserDto, [
  'refreshToken',
]) {
  @ApiProperty({
    name: 'access_token',
    type: String,
  })
  accessToken: string;
}
