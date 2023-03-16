import { IntDto } from './int.dto';
import { TimestampDto } from './timestamp.dto';
import { IntersectionType } from '@nestjs/swagger';

export class IntTimestampDto extends IntersectionType(
  TimestampDto,
  IntDto
) {}
