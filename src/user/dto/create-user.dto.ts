import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'pJgTCuyzOgfpax6BuGphA7nGCMG3' })
  @IsString()
  @IsNotEmpty()
  firebaseId: string;

  @ApiProperty({ example: 'john.doe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  username?: string;

  @ApiPropertyOptional({ example: 'John Doe is a visionary entrepreneur and philanthropist.' })
  @IsOptional()
  @IsString()
  bio?: string;
}
