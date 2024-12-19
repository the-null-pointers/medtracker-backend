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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addPatient(createProfileDto, user) {
        try {
            const profile = await this.prisma.user.update({
                where: {
                    phone: user.phone,
                },
                data: {
                    patients: {
                        create: {
                            first_name: createProfileDto.firstName,
                            last_name: createProfileDto.lastName,
                            middle_name: createProfileDto.middleName,
                            identifier: createProfileDto.identifier,
                            dob: createProfileDto.dob,
                            gender: createProfileDto.gender,
                            address: createProfileDto.address,
                            contact_info: createProfileDto.contactInfo,
                            image: createProfileDto.image,
                            email: createProfileDto.email,
                            e_contact: createProfileDto.eContact,
                            blood_group: createProfileDto.bloodGroup,
                            e_name: createProfileDto.eName,
                            about: createProfileDto.about,
                        },
                    },
                },
                include: {
                    patients: true,
                },
            });
            return response_helper_1.default.success('Patient added successfully', profile);
        }
        catch (error) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Some fields are missing or invalid', await error));
        }
    }
    async updatePatient(id, createProfileDto, user) {
        try {
            const profile = await this.prisma.user.update({
                where: {
                    phone: user.phone,
                },
                data: {
                    patients: {
                        update: {
                            where: {
                                id: id,
                            },
                            data: {
                                first_name: createProfileDto.firstName,
                                last_name: createProfileDto.lastName,
                                identifier: createProfileDto.identifier,
                                dob: createProfileDto.dob,
                                gender: createProfileDto.gender,
                                address: createProfileDto.address,
                                image: createProfileDto.image,
                                middle_name: createProfileDto.middleName,
                                email: createProfileDto.email,
                                e_contact: createProfileDto.eContact,
                                blood_group: createProfileDto.bloodGroup,
                                e_name: createProfileDto.eName,
                                about: createProfileDto.about,
                            },
                        },
                    },
                },
                include: {
                    patients: true,
                },
            });
            return response_helper_1.default.success('Patient updated successfully', profile);
        }
        catch (error) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Some fields are missing or invalid', await error));
        }
    }
    async findAllPatients(user) {
        try {
            const profile = await this.prisma.user.findUnique({
                where: {
                    phone: user.phone,
                },
                select: {
                    id: true,
                    email: true,
                    roles: true,
                    phone: true,
                    patients: {
                        select: {
                            id: true,
                            e_name: true,
                            first_name: true,
                            last_name: true,
                            middle_name: true,
                        },
                    },
                },
            });
            return response_helper_1.default.success('Patients found successfully', profile);
        }
        catch (error) {
            throw new common_1.BadRequestException(response_helper_1.default.error(error.message, await error));
        }
    }
    async findOnePatient(id, user) {
        console.log(id, user);
        const patient = await this.prisma.patient.findUnique({
            where: {
                id: id,
                user_id: user.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        email: true,
                        roles: true,
                    },
                },
                healthHistory: true,
                bills: true,
                prescriptions: true,
                insurance: true,
                appointments: true,
                visits: {
                    include: {
                        hospital: {
                            select: {
                                id: true,
                                hospital_name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Patient not found'));
        }
        return response_helper_1.default.success('Patient found successfully', patient);
    }
    async remove(id) {
        const patient = await this.prisma.patient.findUnique({
            where: {
                id: id,
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Patient not found'));
        }
        const deletePatient = await this.prisma.patient.delete({
            where: {
                id: id,
            },
        });
        return response_helper_1.default.success('Patient deleted successfully', deletePatient);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map