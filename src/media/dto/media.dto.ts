import { IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MediaDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsNumber()
  order: number;
}
