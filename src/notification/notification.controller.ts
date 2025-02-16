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
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-by-doctor')
  @ApiBearerAuth()
  @Roles('DOCTOR')
  create(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: any,
  ) {
    return this.notificationService.doctorsNotification(
      user,
      createNotificationDto,
    );
  }
  @Post('send-by-hospital')
  @ApiBearerAuth()
  @Roles('HOSPITAL')
  creatByHospital(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: any,
  ) {
    return this.notificationService.hospitalNotification(
      user,
      createNotificationDto,
    );
  }
  @Post('send-by-admin')
  @ApiBearerAuth()
  @Roles('ADMIN')
  createByAdmin(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: any,
  ) {
    return this.notificationService.adminNotification(
      user,
      createNotificationDto,
    );
  }
  @Post('send-by-admin-for-hospital')
  @ApiBearerAuth()
  @Roles('ADMIN')
  sendForHospital(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: any,
  ) {
    return this.notificationService.hostpitalAdminNotification(
      user,
      createNotificationDto,
    );
  }

  @Get()
  @Roles('')
  @ApiBearerAuth()
  findAll(@CurrentUser() user: any) {
    return this.notificationService.findAll(user);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
