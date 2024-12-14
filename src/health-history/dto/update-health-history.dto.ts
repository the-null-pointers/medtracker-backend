import { PartialType } from '@nestjs/swagger';
import { CreateHealthHistoryDto } from './create-health-history.dto';

export class UpdateHealthHistoryDto extends PartialType(CreateHealthHistoryDto) {}
