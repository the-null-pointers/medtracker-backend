import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenerateAdminsService } from './generate-admins.service';
import { CreateGenerateAdminDto } from './dto/create-generate-admin.dto';
import { UpdateGenerateAdminDto } from './dto/update-generate-admin.dto';

@Controller('generate-admins')
export class GenerateAdminsController {
  constructor(private readonly generateAdminsService: GenerateAdminsService) {}

  @Post()
  create(@Body() createGenerateAdminDto: CreateGenerateAdminDto) {
    return this.generateAdminsService.createRoles(createGenerateAdminDto);
  }

  // @Get()
  // findAll() {
  //   return this.generateAdminsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.generateAdminsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGenerateAdminDto: UpdateGenerateAdminDto) {
  //   return this.generateAdminsService.update(+id, updateGenerateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.generateAdminsService.remove(+id);
  // }
}
