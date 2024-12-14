import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  async doctorsNotification(
    user: any,
    createNotificationDto: CreateNotificationDto,
  ) {
    const patients = await this.prisma.patient.findMany({
      where: {
        visits: {
          some: {
            doctor_id: user.doctor.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    const notification = await this.prisma.notification.create({
      data: {
        type: createNotificationDto.type,
        condition: createNotificationDto.condition,
        title: createNotificationDto.title,
        message: createNotificationDto.message,
        user_id: user.id, // Associate the notification with a user
        patients: {
          connect: patients.map((patient) => ({
            id: patient.id, // Ensure these `id` values exist in the `Patient` table
          })),
        },
      },
      include: {
        patients: {
          select: {
            id: true,
            first_name: true,
          },
        },
      },
    });

    return responseHelper.success(
      'Notification created successfully',
      notification,
    );
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
