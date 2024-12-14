import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabReportDto } from './dto/create-lab-report.dto';
import { UpdateLabReportDto } from './dto/update-lab-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class LabReportService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLabReportDto: CreateLabReportDto) {
    const labReport = await this.prisma.labReport.create({
      data: createLabReportDto,
    });
    return responseHelper.success('Lab Report created successfully', labReport);
  }

  async findAll() {
    const labReports = await this.prisma.labReport.findMany();
    if (!labReports) {
      throw new NotFoundException(
        responseHelper.error('Lab Reports not found'),
      );
    }
    return responseHelper.success('Lab Reports found successfully', {
      labReports: labReports,
    });
  }

  async findOne(id: number) {
    const labReport = await this.prisma.labReport.findUnique({
      where: {
        id: id,
      },
    });
    if (!labReport) {
      throw new NotFoundException(responseHelper.error('Lab Report not found'));
    }
    return responseHelper.success('Lab Report found successfully', labReport);
  }

  async update(id: number, updateLabReportDto: UpdateLabReportDto) {
    const labReport = await this.prisma.labReport.findUnique({
      where: {
        id: id,
      },
    });
    if (!labReport) {
      throw new NotFoundException(responseHelper.error('Lab Report not found'));
    }
    const updatedLabReport = await this.prisma.labReport.update({
      where: {
        id: id,
      },
      data: updateLabReportDto,
    });
    return responseHelper.success(
      'Lab Report updated successfully',
      updatedLabReport,
    );
  }

  async remove(id: number) {
    const labReport = await this.prisma.labReport.findUnique({
      where: {
        id: id,
      },
    });
    if (!labReport) {
      throw new NotFoundException(responseHelper.error('Lab Report not found'));
    }
    const deletedLabReport = await this.prisma.labReport.delete({
      where: {
        id: id,
      },
    });
    return responseHelper.success(
      'Lab Report deleted successfully',
      deletedLabReport,
    );
  }
}
