import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenApiResponseDto {
  @ApiProperty({
    name: 'access_token',
    type: String,
  })
  access_token: string;
}
