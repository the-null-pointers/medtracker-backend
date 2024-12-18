import { Module } from '@nestjs/common';
import { GenerateAdminsService } from './generate-admins.service';
import { GenerateAdminsController } from './generate-admins.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GenerateAdminsController],
  providers: [GenerateAdminsService, PrismaService],
})
export class GenerateAdminsModule {}
