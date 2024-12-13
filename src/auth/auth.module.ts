import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { ConfigModule } from '@nestjs/config';
import { TwilioService } from 'src/twilio/twilio.service';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService,JwtService,MailerService,TwilioService],
})
export class AuthModule {}
