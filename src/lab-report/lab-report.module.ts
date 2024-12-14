import { Module } from '@nestjs/common';
import { LabReportService } from './lab-report.service';
import { LabReportController } from './lab-report.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LabReportController],
  providers: [LabReportService, PrismaService,JwtService],
})
export class LabReportModule {}
