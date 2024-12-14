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
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}
  @Roles('DOCTOR')
  @ApiBearerAuth()
  @Post('')
  create(
    @Body() createTreatmentDto: CreateTreatmentDto,
    @CurrentUser() user: any,
  ) {
    console.log(user);
    return this.treatmentService.addTreatment(createTreatmentDto, user);
  }
  @Roles('ADMIN', 'DOCTOR')
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.treatmentService.findAll();
  }
  @Roles('DOCTOR', 'ADMIN')
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentService.findOne(+id);
  }
  @Roles('DOCTOR')
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentService.update(+id, updateTreatmentDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.treatmentService.remove(+id);
  // }
}
