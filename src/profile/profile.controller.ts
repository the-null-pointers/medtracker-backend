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
import { ProfileService } from './profile.service';
import { CreateProfileDto, UserResponseDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('api/profile')
@UseGuards(AuthGuard, RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @ApiBearerAuth()
  @Post('patient')
  addPatient(
    @Body() createProfileDto: CreateProfileDto,
    @CurrentUser() user: any,
  ) {
    // initialize validation

    return this.profileService.addPatient(createProfileDto, user);
  }
  @ApiBearerAuth()
  @Patch('patient/:id')
  updatePatient(
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() user: any,
    @Param('id') id: number,
  ) {
    return this.profileService.updatePatient(id, updateProfileDto, user);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get all patients',
    type: UserResponseDto,
  })
  @Get('patient')
  findAll(@CurrentUser() user: any) {
    return this.profileService.findAllPatients(user);
  }

  @ApiBearerAuth()
  @Get('patient/:id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.profileService.findOnePatient(+id, user);
  }
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
