import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @ApiProperty({ example: 'John' })
  firstName: string;
  @IsString()
  @ApiProperty({ example: 'doe' })
  lastName: string;
  @IsString()
  @ApiProperty({ example: 'John' })
  specialization: string;
  @IsString()
  @ApiProperty({ example: 'John' })
  contactInfo: string;
  @ApiProperty({ example: 'email' })
  email: string;
  @ApiProperty({ example: 'phone' })
  phone: string;
  @ApiProperty({ example: '1' })
  hospital_id: number;
}

export class CreateLabReportDto {
  title: string;
  description?: string;
  fileUrl?: string;
  visitId: number;
}

export class CreateTreatmentDto {
  treatment_name: string;
  prescription?: string;
  diagnosis?: string;
  treatment_date: Date;
  visit_id: number;
  doctor_id: number;
}
