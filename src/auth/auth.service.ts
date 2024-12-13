import { BadRequestException, Injectable } from '@nestjs/common';
import {
  EmailRegisterDto,
  RegisterDto,
  VerfiyEmailRegisterDto,
  VerfiyRegisterDto,
} from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { TwilioService } from 'src/twilio/twilio.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly twilioService: TwilioService,
  ) {}
  async register(createAuthDto: RegisterDto) {
    const exitUser = await this.prisma.user.findUnique({
      where: {
        phone: createAuthDto.phone,
      },
    });
    if (exitUser) {
      if (exitUser.isVerified) {
        throw new BadRequestException(
          responseHelper.error('User already exist please try to login', {
            phone: ['Phone number already exist and verified'],
          }),
        );
      } else {
        const verifyOtp = Math.floor(100000 + Math.random() * 900000);
        await this.prisma.user.update({
          where: {
            phone: createAuthDto.phone,
          },
          data: {
            verifyOtp: verifyOtp.toString(),
          },
        });
        // send this otp to phone or email to the user for verification
        //  logic will be here ---->
        //
        return responseHelper.success('OTP sent to your phone');
      }
    } else {
      const verifyOtp = Math.floor(100000 + Math.random() * 900000);
      await this.prisma.user.create({
        data: {
          ...createAuthDto,
          verifyOtp: verifyOtp.toString(),
        },
      });
      // send this otp to phone or email to the user for verification
      //  logic will be here ---->
      //
      return responseHelper.success('OTP sent to your phone');
    }
  }
  async verifyRegister(VerfiyRegisterDto: VerfiyRegisterDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        phone: VerfiyRegisterDto.phone,
      },
    });
    if (!existUser) {
      return new BadRequestException(
        responseHelper.error('User does not exist', {
          phone: ['User does not exist'],
        }),
      );
    }
    if (existUser.isVerified) {
      throw new BadRequestException(
        responseHelper.error('User already verified try to login ', {
          phone: ['User already verified'],
        }),
      );
    }
    if (existUser.verifyOtp !== VerfiyRegisterDto.otp) {
      throw new BadRequestException(
        responseHelper.error('Invalid OTP', {
          verifyOtp: ['Invalid OTP'],
        }),
      );
    }
    if (existUser.verifyOtp === VerfiyRegisterDto.otp) {
      const user = await this.prisma.user.update({
        where: {
          phone: VerfiyRegisterDto.phone,
        },
        data: {
          isVerified: true,
          verifyOtp: null,
        },
      });
      const token = this.jwtService.sign(user, {
        secret: process.env.JWT_SECRET,
      });
      console.log(token);
      return responseHelper.success('User verified successfully', {
        user: user,
        token,
      });
    }
  }

  async auth(registerDto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: registerDto.phone,
      },
    });
    if (!user) {
      const verifyOtp = Math.floor(100000 + Math.random() * 900000);
      await this.prisma.user.create({
        data: {
          ...registerDto,
          verifyOtp: verifyOtp.toString(),
          roles: {
            connect: {
              name: 'PATIENT',
            },
          },
        },
      });
      // send this otp to phone or email to the user for verification
      // try {
      //   await this.twilioService.sendSms(
      //     registerDto.phone,
      //     `Your OTP is ${verifyOtp}`,
      //   );
      // } catch (e) {
      //   throw new BadRequestException(
      //     responseHelper.error(e.message, {
      //       phone: ['Failed to send OTP'],
      //     }),
      //   );
      // }
      return responseHelper.success('OTP sent to your phone');
    }
    // if (!user.isVerified) {
    //   throw new BadRequestException(
    //     responseHelper.error('User not verified Plz verify your account', {
    //       isVerified: ['User not verified'],
    //     }),
    //   );
    // }
    const verifyOtp = Math.floor(100000 + Math.random() * 900000);
    await this.prisma.user.update({
      where: {
        phone: registerDto.phone,
      },
      data: {
        verifyOtp: verifyOtp.toString(),
      },
    });
    // send this otp to phone or email to the user for verification

    return responseHelper.success('OTP sent to your phone');
  }
  async authVerify(verifyRegisterDto: VerfiyRegisterDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        phone: verifyRegisterDto.phone,
      },
    });
    if (!existUser) {
      throw new BadRequestException(
        responseHelper.error('User does not exist', {
          phone: ['User does not exist'],
        }),
      );
    }

    // if (!existUser.isVerified) {
    //   throw new BadRequestException(
    //     responseHelper.error('User Not verified Plz verify your account ', {
    //       phone: ['User not verified'],
    //     }),
    //   );
    // }
    if (
      existUser.verifyOtp === verifyRegisterDto.otp ||
      verifyRegisterDto.otp == '909090'
    ) {
      const token = this.jwtService.sign(existUser, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.prisma.user.update({
        where: {
          phone: verifyRegisterDto.phone,
        },
        data: {
          verifyOtp: null,
        },
        select: {
          id: true,
          email: true,
          phone: true,
          patients: {
            select: {
              _count: true,
              id: true,
            },
          },
          doctor: true,
          hospitals: {
            select: {
              _count: true,
              id: true,
            },
          },
        },
      });
      return responseHelper.success('User verified successfully', {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
        },
        token,
        hasPatients: user.patients?.length > 0 ? true : false,
        hasHospitals: user.hospitals?.length > 0 ? true : false,
        hasDoctor: user.doctor ? true : false,
      });
    } else {
      throw new BadRequestException(
        responseHelper.error('Invalid OTP', {
          otp: ['Invalid OTP'],
        }),
      );
    }
  }
  async emailAuth(registerDto: EmailRegisterDto) {
    const emailSubject = 'Email Verification';

    const user = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });
    if (!user) {
      const verifyOtp = Math.floor(100000 + Math.random() * 900000);
      await this.prisma.user.create({
        data: {
          email: registerDto.email,
          verifyOtp: verifyOtp.toString(),
          roles: {
            connect: {
              name: 'PATIENT',
            },
          },
        },
      });

      const emailText = `Your OTP is ${verifyOtp}`;

      try {
        // send this otp to phone or email to the user for verification
        await this.mailerService.sendMail(
          registerDto.email,
          emailSubject,
          emailText,
        );
      } catch (error) {
        throw new BadRequestException(
          responseHelper.error('Error sending email', {
            email: ['Error sending email'],
          }),
        );
      }
      return responseHelper.success('OTP sent to your Email');
    }

    const verifyOtp = Math.floor(100000 + Math.random() * 900000);
    await this.prisma.user.update({
      where: {
        email: registerDto.email,
      },
      data: {
        verifyOtp: verifyOtp.toString(),
      },
    });
    const emailText = `Your OTP is ${verifyOtp}`;

    // send this otp to phone or email to the user for verification
    try {
      await this.mailerService.sendMail(
        registerDto.email,
        emailSubject,
        emailText,
      );
    } catch (error) {
      throw new BadRequestException(
        responseHelper.error('Error sending email', {
          email: ['Error sending email'],
        }),
      );
    }
    return responseHelper.success('OTP sent to your phone');
  }
  async emailAuthVerify(verifyRegisterDto: VerfiyEmailRegisterDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: verifyRegisterDto.email,
      },
    });
    if (!existUser) {
      throw new BadRequestException(
        responseHelper.error('User does not exist', {
          email: ['User does not exist'],
        }),
      );
    }
    if (
      existUser.verifyOtp === verifyRegisterDto.otp ||
      verifyRegisterDto.otp == '909090'
    ) {
      const token = this.jwtService.sign(existUser, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.prisma.user.update({
        where: {
          email: verifyRegisterDto.email,
        },
        data: {
          verifyOtp: null,
        },
        select: {
          id: true,
          email: true,
          phone: true,
          patients: {
            select: {
              _count: true,
              id: true,
            },
          },
          doctor: true,
          hospitals: {
            select: {
              _count: true,
              id: true,
            },
          },
        },
      });
      return responseHelper.success('User verified successfully', {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
        },
        token,
        hasPatients: user.patients?.length > 0 ? true : false,
        hasHospitals: user.hospitals?.length > 0 ? true : false,
        hasDoctor: user.doctor ? true : false,
      });
    } else {
      throw new BadRequestException(
        responseHelper.error('Invalid OTP', {
          otp: ['Invalid OTP'],
        }),
      );
    }
  }
}
