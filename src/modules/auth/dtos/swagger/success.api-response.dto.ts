import { ApiProperty } from '@nestjs/swagger';

export class SuccessApiResponseDto {
  @ApiProperty({ type: Boolean })
  success: boolean;
}
