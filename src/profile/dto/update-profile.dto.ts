import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProfileDto extends CreateProfileDto {
  // @IsNotEmpty({ message: 'Patient ID is required' })
  // patientId: number;
}
