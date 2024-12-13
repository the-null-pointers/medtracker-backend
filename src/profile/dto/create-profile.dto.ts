// src/dto/create-profile.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Identifier is required' })
  identifier: string;
  @ApiProperty()
  @IsString({ message: 'DOB must be a valid date' })
  dob: string;
  @ApiProperty()
  @IsEnum(Gender, { message: 'Gender must be one of: male, female, or other' })
  gender: Gender;
  @ApiProperty()
  @IsString({ message: 'Address must be an object' })
  address: string; // Define a detailed address DTO if needed for nested validation
  @ApiProperty()
  @IsString()
  @IsOptional()
  contactInfo: string;
  // @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  eContact: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bloodGroup: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  eName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  about: string;

  constructor(data: Partial<CreateProfileDto>) {
    Object.assign(this, data);
  }
}

// response data
class PatientDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the patient' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Name of the patient' })
  first_name: string;
  @ApiProperty({ example: 'John Doe', description: 'Name of the patient' })
  middle_name: string;
  @ApiProperty({ example: 'John Doe', description: 'Name of the patient' })
  last_name: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the patient' })
  e_name: string;

  // Add other properties of `patients` if necessary
}

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: ['admin', 'user'],
    description: 'Roles assigned to the user',
    isArray: true,
  })
  roles: string[];

  @ApiProperty({
    example: '1234567890',
    description: 'Phone number of the user',
  })
  phone: string;

  @ApiProperty({
    description: 'List of patients associated with the user',
    type: [PatientDto],
  })
  patients: PatientDto[];
}