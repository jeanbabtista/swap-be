import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MediaDto } from '@app/media/dto/media.dto';

export class CreateProductDto {
  @ApiProperty({ example: 'Blue Jeans' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A pair of blue jeans.' })
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @ApiPropertyOptional({ example: 'A pair of blue jeans that are in great condition.' })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(0)
  @Max(5)
  condition: number;

  @ApiProperty()
  @IsUUID(4)
  categoryId: string;

  @ApiProperty({ type: MediaDto, isArray: true })
  @Type(() => MediaDto)
  @ValidateNested({ each: true })
  media: MediaDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4, { each: true })
  attributes?: string[]; // category attribute values
}
