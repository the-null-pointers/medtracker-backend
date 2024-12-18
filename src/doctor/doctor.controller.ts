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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { CurrentUser } from 'src/current-user/current-user.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiBearerAuth()
  @Roles('HOSPITAL')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get("all")
  @ApiBearerAuth()

  findAll() {
    return this.doctorService.allDoctors();
  }
  
  @Get('one-hospital-doctors/:hospital_id')
  @ApiBearerAuth()
  @Roles('HOSPITAL')
  doctorsInHospital(
    @CurrentUser() user: any,
    @Param('hospital_id') hospital_id: string,
  ) {
    return this.doctorService.doctorsInHospital(+hospital_id, user);
  }

  @Get(':hospital_id')
  @ApiBearerAuth()
  @Roles('DOCTOR', 'HOSPITAL')
  findOne(@Param('hospital_id') id: string, @CurrentUser() user: any) {
    return this.doctorService.doctorDetails(+id, user.id);
  }

  @Get('patients-queue/:hospital_id')
  @ApiBearerAuth()
  @Roles('DOCTOR')
  patientsOfOneDoctor(
    @Param('hospital_id') hospital_id: number,
    @CurrentUser() user: any,
  ) {
    return this.doctorService.patientsOfOneDoctor(
      user?.doctor?.id,
      +hospital_id,
    );
  }
  @Get('details-of-one-patient-by-doctor')
  @ApiBearerAuth()
  @Roles('DOCTOR')
  detailsOfOnePatientByDoctor(
    @Param('visit_id') visit_id: number,
    @Param('hospital_id') hospital_id: number,
    @CurrentUser() user: any,
  ) {
    return this.doctorService.detailsOfOnePatientByDoctor(
      user?.doctor?.id,
      +visit_id,
      +hospital_id,
    );
  }

  @Get('associate-hospitals-of-doctor')
  @ApiBearerAuth()
  @Roles('DOCTOR')
  associateHospitalsOfDoctor(@CurrentUser() user: any) {
    return this.doctorService.associateHospitalsOfDoctor(user?.doctor?.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('DOCTOR', 'ADMIN')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('DOCTOR', 'ADMIN')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
