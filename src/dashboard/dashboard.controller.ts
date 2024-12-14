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
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats/doctor')
  @ApiBearerAuth()
  @Roles('DOCTOR')
  getDoctorStats(@CurrentUser() user: any) {
    return this.dashboardService.getDoctorStats(user?.id);
  }

  @Roles('HOSPITAL')
  @ApiBearerAuth()
  @Get('stats/hospital/:hospital_id')
  findOne(@CurrentUser() user: { id: string }, @Param('hospital_id') id: string) {
    return this.dashboardService.getHospitalStats(user.id,+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
