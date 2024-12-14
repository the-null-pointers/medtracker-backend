import { Module } from '@nestjs/common';
import { HealthHistoryService } from './health-history.service';
import { HealthHistoryController } from './health-history.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [HealthHistoryController],
  providers: [HealthHistoryService, PrismaService,JwtService],
})
export class HealthHistoryModule {}
