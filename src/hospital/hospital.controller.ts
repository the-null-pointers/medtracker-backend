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
import { HospitalService } from './hospital.service';
import {
  CreateHospitalDto,
  CreatePatientFromHospitalDto,
} from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @ApiBearerAuth()
  // @Roles("ADMIN")
  @Post('create-hospital')
  createHospital(
    @Body() createHospitalDto: CreateHospitalDto,
    @CurrentUser() user: any,
  ) {
    return this.hospitalService.createHospital(createHospitalDto, user);
  }

  @ApiBearerAuth()
  @Get('unverified-hospitals')
  @Roles('ADMIN')
  unVerifiedHospitals() {
    return this.hospitalService.unVerifiedHospitals();
  }

  @ApiBearerAuth()
  @Patch('verify-hospital/:id')
  @Roles('ADMIN')
  verifyHospital(@Param('id') id: number) {
    return this.hospitalService.verifyHospital(id);
  }

  @ApiBearerAuth()
  @ApiProperty()
  @Patch('/:visit_id/:status')
  @Roles('DOCTOR', 'ADMIN', 'HOSPITAL')
  updateStatus(
    @Param('visit_id') visit_id: string,
    @Param('status') status: string,
  ) {
    return this.hospitalService.updateStatus(+visit_id, status);
  }

  @ApiBearerAuth()
  @Post('patients')
  @Roles('HOSPITAL')
  createPatient(
    @Body() createPatientDto: CreatePatientFromHospitalDto,
    @CurrentUser() hospital: any,
  ) {
    return this.hospitalService.createPatient(createPatientDto);
  }

  // @ApiBearerAuth()
  // @Get('patients/:hospital_id')
  // @Roles('HOSPITAL')
  // findAllPatients(
  //   @Param('hospital_id') id: number,
  //   // param: {
  //   //   skip: number;
  //   //   take: number;
  //   //   search: string;
  //   //   from: Date;
  //   //   to: Date;
  //   // },
  //   @CurrentUser() user: any,
  // ) {
  //   return this.hospitalService.findAllDataFromOneHospital(id, user);
  // }

  @ApiBearerAuth()
  @Get('all')
  // @Roles('ADMIN')
  findAll() {
    return this.hospitalService.findAllHospital();
  }

  @ApiBearerAuth()
  @Get('queue-patients/:hospital_id')
  @Roles('HOSPITAL')
  findOneDayPatients(@Param('hospital_id') hospital_id: number) {
    return this.hospitalService.queuePatients(+hospital_id);
  }
  @ApiBearerAuth()
  @Get('on-going-patients/:hospital_id')
  @Roles('HOSPITAL')
  findOnGoingPatients(@Param('hospital_id') hospital_id: number) {
    return this.hospitalService.onGoingPatients(+hospital_id);
  }

  @ApiBearerAuth()
  @Get('')
  @Roles('HOSPITAL')
  find(@CurrentUser() user: any) {
    return this.hospitalService.findHospital(user.id);
  }

  // @ApiBearerAuth()
  // @Get(':id')
  // @Roles('HOSPITAL', 'DOCTOR')
  // findOne(@Param('id') id: string, @CurrentUser() user: any) {
  //   return this.hospitalService.findOnePatient(+id, user);
  // }

  @ApiBearerAuth()
  @Get(':id')
  @Roles('HOSPITAL', 'DOCTOR')
  getDetails(@Param('id') id: string, @CurrentUser() user: any) {
    return this.hospitalService.findHospitalById(+id);
  }

  @ApiBearerAuth()
  @Get('patient-list/:hospital_id')
  @Roles('HOSPITAL')
  getPatientList(@Param('hospital_id') id: number, @CurrentUser() user: any) {
    return this.hospitalService.listOfPatients(+id, user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('HOSPITAL', 'ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    return this.hospitalService.update(+id, updateHospitalDto);
  }

  @ApiBearerAuth()
  @Roles('HOSPITAL', 'ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.hospitalService.remove(+id, user);
  }
}
