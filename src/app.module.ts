import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MiddlewareMiddleware } from './middleware/middleware.middleware';
import { ProfileModule } from './profile/profile.module';
import { HospitalModule } from './hospital/hospital.module';
import { DoctorModule } from './doctor/doctor.module';
import { TreatmentModule } from './treatment/treatment.module';
import { HealthHistoryModule } from './health-history/health-history.module';
import { RolesModule } from './roles/roles.module';
import { LabReportModule } from './lab-report/lab-report.module';
import { MailerModule } from './mailer/mailer.module';
import { TwilioService } from './twilio/twilio.service';

@Module({
  imports: [AuthModule, PrismaModule, ProfileModule, HospitalModule, DoctorModule, TreatmentModule, HealthHistoryModule, RolesModule, LabReportModule, MailerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, TwilioService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareMiddleware).forRoutes('*'); // Apply to all routes in this module
  }
}
