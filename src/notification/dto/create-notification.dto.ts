import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  message: string;
  @IsString()
  @ApiProperty()
  type: string;
  @IsString()
  @ApiProperty()
  condition: string;
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  hospital_id: number;
}
