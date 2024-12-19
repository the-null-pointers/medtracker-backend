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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let DoctorService = class DoctorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDoctorDto) {
        let existUser = await this.prisma.user.findUnique({
            where: {
                phone: createDoctorDto.phone,
            },
        });
        if (!existUser) {
            existUser = await this.prisma.user.create({
                data: {
                    phone: createDoctorDto.phone,
                    roles: {
                        connect: {
                            name: 'DOCTOR',
                        },
                    },
                },
            });
        }
        const exitHospital = await this.prisma.hospital.findUnique({
            where: {
                id: createDoctorDto.hospital_id,
                admins: {
                    some: {
                        id: existUser.id,
                    },
                },
            },
        });
        if (!exitHospital) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Hospital not found'));
        }
        await this.prisma.user.update({
            where: {
                phone: createDoctorDto.phone,
            },
            data: {
                roles: {
                    connect: {
                        name: 'DOCTOR',
                    },
                },
            },
        });
        const doctor = await this.prisma.doctor.create({
            data: {
                first_name: createDoctorDto.firstName,
                last_name: createDoctorDto.lastName,
                specialization: createDoctorDto.specialization,
                contact_info: createDoctorDto.contactInfo,
                user: {
                    connect: {
                        email: createDoctorDto.email,
                    },
                },
                hospitals: {
                    connect: {
                        id: createDoctorDto.hospital_id,
                    },
                },
            },
            include: {
                user: {
                    select: {
                        phone: true,
                        roles: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('Doctor created successfully', doctor);
    }
    async doctorsInHospital(hospital_id, user) {
        const hospital = await this.prisma.hospital.findUnique({
            where: {
                id: hospital_id,
                admins: {
                    some: {
                        id: user.id,
                    },
                },
            },
        });
        if (!hospital) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Hospital not found or you are not admin of this hospital'));
        }
        const data = await this.prisma.doctor.findMany({
            where: {
                hospitals: {
                    some: {
                        id: hospital_id,
                    },
                },
            },
            include: {
                user: {
                    select: {
                        phone: true,
                        roles: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('Doctors found successfully', data);
    }
    async allDoctors() {
        const data = await this.prisma.doctor.findMany({
            select: {
                first_name: true,
                last_name: true,
                specialization: true,
                contact_info: true,
            },
        });
        if (!data) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Doctors not found'));
        }
        return response_helper_1.default.success('Doctors found successfully', data);
    }
    async doctorDetails(id, userId) {
        const data = await this.prisma.user.findUnique({
            where: {
                hospitals: {
                    some: {
                        id: id,
                    },
                },
                id: userId,
            },
            include: {
                roles: true,
                doctor: {
                    select: {
                        treatments: {
                            select: {
                                id: true,
                                treatment_name: true,
                                diagnosis: true,
                            },
                        },
                        visits: {
                            select: {
                                _count: true,
                                id: true,
                                visit_date: true,
                                status: true,
                                reason: true,
                                tokenNo: true,
                                patient: {
                                    select: {
                                        id: true,
                                        first_name: true,
                                        last_name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!data) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Doctors not found'));
        }
        return response_helper_1.default.success('Doctors found successfully', data);
    }
    async patientsOfOneDoctor(id, hospital_id) {
        const visit_date = new Date();
        const startDate = new Date(visit_date);
        const endDate = new Date(visit_date);
        endDate.setDate(endDate.getDate() + 1);
        const data = await this.prisma.doctor.findUnique({
            where: {
                hospitals: {
                    some: {
                        id: hospital_id,
                    },
                },
                id: id,
                visits: {
                    some: {
                        visit_date: {
                            gte: startDate,
                            lte: endDate,
                        },
                        status: 'PENDING',
                    },
                },
            },
            include: {
                visits: {
                    select: {
                        reason: true,
                        tokenNo: true,
                        patient: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                revisit_interval: true,
                                blood_group: true,
                                gender: true,
                            },
                        },
                    },
                },
            },
        });
        if (!data) {
            return response_helper_1.default.success('No Patients found', []);
        }
        return response_helper_1.default.success('Patients found successfully', data);
    }
    async detailsOfOnePatientByDoctor(id, visit_id, hospital_id) {
        const visit_date = new Date();
        const startDate = new Date(visit_date);
        const endDate = new Date(visit_date);
        endDate.setDate(endDate.getDate() + 1);
        const data = await this.prisma.doctor.findUnique({
            where: {
                hospitals: {
                    some: {
                        id: hospital_id,
                    },
                },
                id,
                visits: {
                    some: {
                        visit_date: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                },
            },
            include: {
                visits: {
                    where: {
                        id: visit_id,
                    },
                    select: {
                        reason: true,
                        tokenNo: true,
                        patient: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                revisit_interval: true,
                                blood_group: true,
                                gender: true,
                                visits: {
                                    include: {
                                        treatments: true,
                                        doctor: true,
                                        labReports: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!data) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Doctors not found'));
        }
        return response_helper_1.default.success('Doctors found successfully', data);
    }
    async associateHospitalsOfDoctor(id) {
        try {
            const data = await this.prisma.hospital.findMany({
                where: {
                    doctors: {
                        some: {
                            id: id,
                        },
                    },
                },
                select: {
                    id: true,
                    hospital_name: true,
                },
            });
            return response_helper_1.default.success('Hospitals found successfully', data);
        }
        catch (error) {
            throw new common_1.BadRequestException(response_helper_1.default.error(error.message, await error));
        }
    }
    async update(id, updateDoctorDto) {
        const doctor = await this.prisma.doctor.findUnique({
            where: {
                id: id,
            },
        });
        if (!doctor) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Doctor not found'));
        }
        const updatedDoctor = await this.prisma.doctor.update({
            where: {
                id: id,
            },
            data: {
                first_name: updateDoctorDto.firstName,
                last_name: updateDoctorDto.lastName,
                specialization: updateDoctorDto.specialization,
                contact_info: updateDoctorDto.contactInfo,
            },
        });
        return response_helper_1.default.success('Doctor updated successfully', updatedDoctor);
    }
    async remove(id) {
        const doctor = await this.prisma.doctor.findUnique({
            where: {
                id: id,
            },
        });
        if (!doctor) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Doctor not found'));
        }
        const deletedDoctor = await this.prisma.doctor.delete({
            where: {
                id: id,
            },
        });
        return response_helper_1.default.success('Doctor deleted successfully', deletedDoctor);
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map