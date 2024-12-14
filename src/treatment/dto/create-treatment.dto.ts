import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class PrescriptionDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  medication_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dosage: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  frequency: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiProperty()
  start_date: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiProperty()
  end_date: Date;
}
export class CreateTreatmentDto {
  @IsString()
  @ApiProperty()
  treatment_name: string;
  @IsString()
  @ApiProperty()
  prescription: string;
  @IsString()
  @ApiProperty()
  diagnosis: string;
  @IsString()
  @ApiProperty()
  treatment_date: Date;
  @ApiProperty()
  visit_id: number;
  @ApiProperty()
  symptoms: string;
  @ApiProperty({
    type: [PrescriptionDto],
    description: 'Array of prescription objects',
  })
  @IsArray()
  @IsOptional()
  @Type(() => PrescriptionDto) // Nested validation
  prescriptions: PrescriptionDto[];
}
