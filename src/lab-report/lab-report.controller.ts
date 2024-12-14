import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LabReportService } from './lab-report.service';
import { CreateLabReportDto } from './dto/create-lab-report.dto';
import { UpdateLabReportDto } from './dto/update-lab-report.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

UseGuards(AuthGuard, RolesGuard);
@Controller('api/lab-report')
export class LabReportController {
  constructor(private readonly labReportService: LabReportService) {}
  @Roles('ADMIN', 'LAB_ASSISTANT', 'DOCTOR')
  @ApiBearerAuth()
  @Post()
  create(@Body() createLabReportDto: CreateLabReportDto) {
    return this.labReportService.create(createLabReportDto);
  }

  @Roles('ADMIN', 'LAB_ASSISTANT', 'DOCTOR')
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.labReportService.findAll();
  }
  @Roles('ADMIN', 'LAB_ASSISTANT', 'DOCTOR')
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labReportService.findOne(+id);
  }
  @Roles('ADMIN', 'LAB_ASSISTANT', 'DOCTOR')
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLabReportDto: UpdateLabReportDto,
  ) {
    return this.labReportService.update(+id, updateLabReportDto);
  }
  @Roles('ADMIN', 'LAB_ASSISTANT', 'DOCTOR')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labReportService.remove(+id);
  }
}
