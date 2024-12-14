import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsInt,
  IsDate,
  IsLatitude,
  IsLongitude,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';

export class CreateHospitalDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  hospital_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  contact_info: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  infoMail?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  about?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  district?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  ward?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  street?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  established?: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isVerified?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  adminPhone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  licenseNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  licenseExpiry?: Date;

  @IsLatitude()
  @IsOptional()
  @ApiProperty()
  latitude?: number;

  @IsLongitude()
  @IsOptional()
  @ApiProperty()
  longitude?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  emergencyPhone?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  rating?: number;
}

export class CreatePatientFromHospitalDto {
  @IsString()
  @ApiProperty()
  phone: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  middleName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  @IsOptional()
  doctorId: number;
  @ApiProperty()
  reason: string;
  @ApiProperty()
  gender: string;
  // @ApiProperty()
  // visitDate: Date;
  // @ApiProperty({ example: '20240909-001' })
  // tokenNo: string;
  @ApiProperty()
  @IsNumber()
  hospital_id: number;
}
