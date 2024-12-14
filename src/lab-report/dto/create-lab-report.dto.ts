import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLabReportDto {
  @IsString()
  @ApiProperty({ example: 'title' })
  title: string;
  @IsString()
  @ApiProperty({ example: 'title' })
  description?: string;
  //   @IsString()
  //   @ApiProperty({ example: 'title' })
  fileUrl?: string;
  @IsString()
  @ApiProperty({ example: 'title' })
  visit_id: number;
}
