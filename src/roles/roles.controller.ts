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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiBearerAuth()
  @Roles('ADMIN')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
