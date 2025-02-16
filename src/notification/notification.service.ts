import { Injectable, NotFoundException } from '@nestjs/common';
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
  async hospitalNotification(
    user: any,
    createNotificationDto: CreateNotificationDto,
  ) {
    if (!createNotificationDto.hospital_id) {
      throw new NotFoundException(
        responseHelper.error('Hospital id is required', {}),
      );
    }
    const hospital = await this.prisma.hospital.findUnique({
      where: {
        id: createNotificationDto.hospital_id,
      },
    });
    if (!hospital) {
      throw new NotFoundException(
        responseHelper.error('Hospital not found', {}),
      );
    }
    const patients = await this.prisma.patient.findMany({
      where: {
        visits: {
          some: {
            hospital_id: createNotificationDto.hospital_id,
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
  async adminNotification(
    user: any,
    createNotificationDto: CreateNotificationDto,
  ) {
    const patients = await this.prisma.patient.findMany({
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
  async hostpitalAdminNotification(
    user: any,
    createNotificationDto: CreateNotificationDto,
  ) {
    const patients = await this.prisma.patient.findMany({
      where: {
        visits: {
          some: {
            hospital_id: user.hospital.id,
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
    });

    return responseHelper.success(
      'Notification created successfully',
      notification,
    );
  }

  async findAll(user: any) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        user_id: user.id,
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
    return responseHelper.success('Notifications found successfully', {
      notifications,
    });
  }

  async findOne(id: number) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: id,
      },
    });
    if (!notification) {
      throw new NotFoundException(
        responseHelper.error('Notification not found'),
      );
    }
    return responseHelper.success(
      'Notification found successfully',
      notification,
    );
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  async remove(id: number) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: id,
      },
    });
    if (!notification) {
      throw new NotFoundException(
        responseHelper.error('Notification not found'),
      );
    }
    const deletedNotification = await this.prisma.notification.delete({
      where: {
        id: id,
      },
    });
    return responseHelper.success(
      'Notification deleted successfully',
      deletedNotification,
    );
  }
}
