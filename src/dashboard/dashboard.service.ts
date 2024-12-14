import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDoctorStats(id: string) {
    const data = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        doctor: {
          select: {
            _count: true,
            id: true,
            visits: {
              where: {
                // today's visits
                visit_date: {
                  gte: new Date(),
                },
              },
            },
          },
        },
      },
    });
    const visitGraph = await this.prisma.visit.findMany({
      where: {
        doctor_id: data.doctor.id,
      },
      select: {
        visit_date: true,
      },
    });
    const monthlyCounts = Array(12).fill(0);

    visitGraph.forEach((visit) => {
      const visitMonth = new Date(visit.visit_date).getMonth(); // Extract month (0-11)
      monthlyCounts[visitMonth]++;
    });
    const result = monthlyCounts.map((count, month) => ({
      month,
      count,
    }));

    if (!data) {
      throw new NotFoundException(responseHelper.error('User not found'));
    }
    return responseHelper.success('User found successfully', {
      doctor: {
        ...data.doctor._count,
        id: data.doctor.id,
      },
      visitGraph: result,
    });
  }

  async getHospitalStats(id: string, hospital_id: number) {
    const data = await this.prisma.hospital.findUnique({
      where: {
        id: hospital_id,
      },
      select: {
        doctors: true,
        admins: true,
        visits: true,
        _count: true,
        id: true,
      },
    });

    if (!data) {
      throw new NotFoundException(responseHelper.error('Hospital not found'));
    }
    return responseHelper.success('Hospital found successfully', {
      ...data,
    });
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
