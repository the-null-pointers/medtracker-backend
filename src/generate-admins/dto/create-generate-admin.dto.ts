import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateGenerateAdminDto {
  @IsArray()
  @ApiProperty({
    example: [
      { name: 'ADMIN' },
      { name: 'DOCTOR' },
      { name: 'PATIENT' },
      { name: 'HOSPITAL' },
    ],
  })
  roles: { name: string }[];
}
