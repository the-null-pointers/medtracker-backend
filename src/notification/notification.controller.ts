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

  @Post()
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

  @Get()
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Find all notifications
   *
   * @returns A list of all notifications
   */
  /******  b58b8e5b-0665-4458-94cd-127de29e0c3a  *******/
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
