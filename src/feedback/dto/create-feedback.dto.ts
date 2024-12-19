import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  message: string;
  @IsNumber()
  @ApiProperty()
  hospitalId: number;
}
