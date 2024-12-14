import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class HealthHistoryService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllHistory(params: any) {
    const data = await this.prisma.healthHistory.findMany({
      skip: params.skip,
      take: params.take,

      where: {},
      orderBy: {
        created_at: 'desc',
      },
      include: {
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    return responseHelper.success('Available history Records', data);
  }
  async getAllHistoryOfOneHospital(params: any, user: any) {
    const data = await this.prisma.healthHistory.findMany({
      skip: params.skip,
      take: params.take,
      where: {
        id: user.hospital_id,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    return responseHelper.success('Available history Records', data);
  }
  async getAllHistoryOfOnePatientByDoctor(id: number, params: any, user: any) {
    const data = await this.prisma.healthHistory.findMany({
      skip: params.skip,
      take: params.take,
      where: {
        patient_id: id,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    return responseHelper.success('Available history Records', data);
  }
  async getAllOwnHistory(params: any, user: any) {
    const data = await this.prisma.healthHistory.findMany({
      skip: params.skip,
      take: params.take,
      where: {
        patient_id: user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    return responseHelper.success('Available history Records', data);
  }
  async getOneVisit(id: number, user: any) {
    const data = await this.prisma.visit.findUnique({
      where: {
        id: id,
      },
      include: {
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            user_id: true,
          },
        },
        prescriptions: true,
        hospital: {
          select: {
            id: true,
            hospital_name: true,
          },
        },
        doctor: true,
        bills: true,
        treatments: true,
      },
    });
    // if the patent doesnt belongs to the patients then he cant see it
    if (data.patient.user_id !== user.id) {
      throw new BadRequestException(
        responseHelper.error('Patient does not exist', {
          patient: ['Patient does not exist'],
        }),
      );
    }
    return responseHelper.success('Available history Record', data);
  }
  async getOneHistory(id: number) {
    const data = await this.prisma.healthHistory.findUnique({
      where: {
        id: id,
      },
      include: {
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    return responseHelper.success('Available history Record', data);
  }
}
