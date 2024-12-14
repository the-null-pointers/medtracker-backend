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
import { HealthHistoryService } from './health-history.service';
import { Roles } from 'src/roles/roles.decorator';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/health-history')
export class HealthHistoryController {
  constructor(private readonly healthHistoryService: HealthHistoryService) {}
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @Get()
  getAll(@Param() params: { skip: number; take: number }) {
    return this.healthHistoryService.getAllHistory(params);
  }

  @Roles('DOCTOR', 'ADMIN', 'HOSPITAL_ADMIN')
  @Get('/patient/:id')
  @ApiBearerAuth()
  getAllHistoryOfOnePatientByDoctor(
    @Param('id') id: number,
    @Param() params: { skip: number; take: number },
    @CurrentUser() user: any,
  ) {
    return this.healthHistoryService.getAllHistoryOfOnePatientByDoctor(
      id,
      params,
      user,
    );
  }
  @Roles('HOSPITAL_ADMIN')
  @Get('/hospital')
  @ApiBearerAuth()
  getAllHistoryOfOneHospital(
    @Param() params: { skip: number; take: number },
    @CurrentUser() user: any,
  ) {
    return this.healthHistoryService.getAllHistoryOfOneHospital(params, user);
  }

  @Roles('PATIENT')
  @ApiBearerAuth()
  @Get('/own')
  getAllOwnHistory(
    @Param() params: { skip: number; take: number },
    @CurrentUser() user: any,
  ) {
    return this.healthHistoryService.getAllOwnHistory(params, user);
  }
  @Get('visit/:id')
  @ApiBearerAuth()
  getOneVisit(@Param('id') id: number, @CurrentUser() user: any) {
    return this.healthHistoryService.getOneVisit(id, user);
  }

  @Roles('PATIENT')
  @ApiBearerAuth()
  @Get(':id')
  getOneHistory(@Param('id') id: number) {
    return this.healthHistoryService.getOneHistory(id);
  }
}
