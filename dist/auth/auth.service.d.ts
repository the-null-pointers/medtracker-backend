import { BadRequestException } from '@nestjs/common';
import { EmailRegisterDto, RegisterDto, UpdateUserDto, VerfiyEmailRegisterDto, VerfiyRegisterDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { TwilioService } from 'src/twilio/twilio.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly mailerService;
    private readonly twilioService;
    constructor(prisma: PrismaService, jwtService: JwtService, mailerService: MailerService, twilioService: TwilioService);
    register(createAuthDto: RegisterDto): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    verifyRegister(VerfiyRegisterDto: VerfiyRegisterDto): Promise<BadRequestException | {
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    auth(registerDto: RegisterDto): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    authVerify(verifyRegisterDto: VerfiyRegisterDto): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    emailAuth(registerDto: EmailRegisterDto): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    emailAuthVerify(verifyRegisterDto: VerfiyEmailRegisterDto): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
}
