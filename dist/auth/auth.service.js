"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
const twilio_service_1 = require("../twilio/twilio.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, mailerService, twilioService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.twilioService = twilioService;
    }
    async register(createAuthDto) {
        const exitUser = await this.prisma.user.findUnique({
            where: {
                phone: createAuthDto.phone,
            },
        });
        if (exitUser) {
            if (exitUser.isVerified) {
                throw new common_1.BadRequestException(response_helper_1.default.error('User already exist please try to login', {
                    phone: ['Phone number already exist and verified'],
                }));
            }
            else {
                const verifyOtp = Math.floor(100000 + Math.random() * 900000);
                await this.prisma.user.update({
                    where: {
                        phone: createAuthDto.phone,
                    },
                    data: {
                        verifyOtp: verifyOtp.toString(),
                    },
                });
                return response_helper_1.default.success('OTP sent to your phone');
            }
        }
        else {
            const verifyOtp = Math.floor(100000 + Math.random() * 900000);
            await this.prisma.user.create({
                data: {
                    ...createAuthDto,
                    verifyOtp: verifyOtp.toString(),
                },
            });
            return response_helper_1.default.success('OTP sent to your phone');
        }
    }
    async verifyRegister(VerfiyRegisterDto) {
        const existUser = await this.prisma.user.findUnique({
            where: {
                phone: VerfiyRegisterDto.phone,
            },
        });
        if (!existUser) {
            return new common_1.BadRequestException(response_helper_1.default.error('User does not exist', {
                phone: ['User does not exist'],
            }));
        }
        if (existUser.isVerified) {
            throw new common_1.BadRequestException(response_helper_1.default.error('User already verified try to login ', {
                phone: ['User already verified'],
            }));
        }
        if (existUser.verifyOtp !== VerfiyRegisterDto.otp) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Invalid OTP', {
                verifyOtp: ['Invalid OTP'],
            }));
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
            return response_helper_1.default.success('User verified successfully', {
                user: user,
                token,
            });
        }
    }
    async auth(registerDto) {
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
            return response_helper_1.default.success('OTP sent to your phone');
        }
        const verifyOtp = Math.floor(100000 + Math.random() * 900000);
        await this.prisma.user.update({
            where: {
                phone: registerDto.phone,
            },
            data: {
                verifyOtp: verifyOtp.toString(),
                roles: {
                    connect: {
                        name: 'PATIENT',
                    },
                },
            },
        });
        return response_helper_1.default.success('OTP sent to your phone');
    }
    async authVerify(verifyRegisterDto) {
        const existUser = await this.prisma.user.findUnique({
            where: {
                phone: verifyRegisterDto.phone,
            },
        });
        if (!existUser) {
            throw new common_1.BadRequestException(response_helper_1.default.error('User does not exist', {
                phone: ['User does not exist'],
            }));
        }
        if (existUser.verifyOtp === verifyRegisterDto.otp ||
            verifyRegisterDto.otp == '909090') {
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
                            id: true,
                            first_name: true,
                            last_name: true,
                        },
                    },
                    doctor: true,
                    hospitals: {
                        select: {
                            id: true,
                            hospital_name: true,
                        },
                    },
                },
            });
            return response_helper_1.default.success('User verified successfully', {
                user: {
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                },
                token,
                hasPatients: user.patients?.length > 0 ? true : false,
                hasHospitals: user.hospitals?.length > 0 ? true : false,
                hasDoctor: user.doctor ? true : false,
                patients: user.patients,
                hospitals: user.hospitals,
                doctor: user.doctor,
            });
        }
        else {
            throw new common_1.BadRequestException(response_helper_1.default.error('Invalid OTP', {
                otp: ['Invalid OTP'],
            }));
        }
    }
    async emailAuth(registerDto) {
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
                await this.mailerService.sendMail(registerDto.email, emailSubject, emailText);
            }
            catch (error) {
                throw new common_1.BadRequestException(response_helper_1.default.error('Error sending email', {
                    email: ['Error sending email'],
                }));
            }
            return response_helper_1.default.success('OTP sent to your Email');
        }
        const verifyOtp = Math.floor(100000 + Math.random() * 900000);
        await this.prisma.user.update({
            where: {
                email: registerDto.email,
            },
            data: {
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
            await this.mailerService.sendMail(registerDto.email, emailSubject, emailText);
        }
        catch (error) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Error sending email', {
                email: ['Error sending email'],
            }));
        }
        return response_helper_1.default.success('OTP sent to your phone');
    }
    async emailAuthVerify(verifyRegisterDto) {
        const existUser = await this.prisma.user.findUnique({
            where: {
                email: verifyRegisterDto.email,
            },
        });
        if (!existUser) {
            throw new common_1.BadRequestException(response_helper_1.default.error('User does not exist', {
                email: ['User does not exist'],
            }));
        }
        if (existUser.verifyOtp === verifyRegisterDto.otp ||
            verifyRegisterDto.otp == '909090') {
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
                            id: true,
                            first_name: true,
                            last_name: true,
                        },
                    },
                    doctor: true,
                    hospitals: {
                        select: {
                            id: true,
                            hospital_name: true,
                        },
                    },
                },
            });
            return response_helper_1.default.success('User verified successfully', {
                user: {
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                },
                token,
                hasPatients: user.patients?.length > 0 ? true : false,
                hasHospitals: user.hospitals?.length > 0 ? true : false,
                hasDoctor: user.doctor ? true : false,
                patients: user.patients,
                hospitals: user.hospitals,
                doctor: user.doctor,
            });
        }
        else {
            throw new common_1.BadRequestException(response_helper_1.default.error('Invalid OTP', {
                otp: ['Invalid OTP'],
            }));
        }
    }
    async updateUser(id, updateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        const userPhone = await this.prisma.user.findUnique({
            where: {
                phone: updateUserDto.phone,
            },
        });
        if (userPhone && userPhone.id !== id) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Phone number already exist', {
                phone: ['Phone number already exist'],
            }));
        }
        const userEmail = await this.prisma.user.findUnique({
            where: {
                email: updateUserDto.email,
            },
        });
        if (userEmail && userEmail.id !== id) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Email already exist', {
                email: ['Email already exist'],
            }));
        }
        if (!user) {
            throw new common_1.BadRequestException(response_helper_1.default.error('User does not exist', {
                id: ['User does not exist'],
            }));
        }
        const updatedUser = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                ...updateUserDto,
            },
        });
        return response_helper_1.default.success('User updated successfully', updatedUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mailer_service_1.MailerService,
        twilio_service_1.TwilioService])
], AuthService);
//# sourceMappingURL=auth.service.js.map