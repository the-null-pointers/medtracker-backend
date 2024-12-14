import { PartialType } from '@nestjs/swagger';
import { CreateHospitalDto } from './create-hospital.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {
  @IsString()
  @IsOptional()
  doctor_id: string;
}
