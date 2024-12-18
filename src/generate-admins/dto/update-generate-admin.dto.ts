import { PartialType } from '@nestjs/swagger';
import { CreateGenerateAdminDto } from './create-generate-admin.dto';

export class UpdateGenerateAdminDto extends PartialType(CreateGenerateAdminDto) {}
