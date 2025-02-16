import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.getAdminData();
  }

  @Get(':hospital_id')
  findHospital(@Param('hospital_id') id: number) {
    return this.adminService.getHospitalData(id);
  }
}
