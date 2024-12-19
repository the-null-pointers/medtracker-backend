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
exports.HospitalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let HospitalService = class HospitalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createHospital(createHospitalDto, user) {
        const hostpitalAdmin = await this.prisma.user.findUnique({
            where: {
                phone: createHospitalDto.adminPhone,
            },
            include: {
                roles: true,
            },
        });
        let admin = undefined;
        if (!hostpitalAdmin) {
            admin = await this.prisma.user.create({
                data: {
                    phone: createHospitalDto.adminPhone,
                    roles: {
                        connect: {
                            name: 'HOSPITAL',
                        },
                    },
                },
                include: {
                    roles: true,
                },
            });
        }
        else {
            admin = await this.prisma.user.update({
                where: {
                    phone: createHospitalDto.adminPhone,
                },
                data: {
                    roles: {
                        connect: {
                            name: 'HOSPITAL',
                        },
                    },
                },
                include: {
                    roles: true,
                },
            });
        }
        try {
            const hospital = await this.prisma.hospital.create({
                data: {
                    hospital_name: createHospitalDto.hospital_name,
                    location: createHospitalDto.location,
                    contact_info: createHospitalDto.contact_info,
                    infoMail: createHospitalDto.infoMail,
                    about: createHospitalDto.about,
                    image: createHospitalDto.image,
                    established: createHospitalDto.established,
                    province: createHospitalDto.province,
                    district: createHospitalDto.district,
                    ward: createHospitalDto.ward,
                    street: createHospitalDto.street,
                    licenseNumber: createHospitalDto.licenseNumber,
                    licenseExpiry: createHospitalDto.licenseExpiry,
                    latitude: createHospitalDto.latitude,
                    longitude: createHospitalDto.longitude,
                    emergencyPhone: createHospitalDto.emergencyPhone,
                    rating: 0,
                    isVerified: user?.roles?.some((role) => role.name === 'ADMIN')
                        ? createHospitalDto.isVerified
                        : false,
                    adminPhone: admin?.phone,
                    admins: {
                        connect: {
                            id: admin?.id,
                        },
                    },
                },
            });
            return response_helper_1.default.success('Hospital created successfully', hospital);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(response_helper_1.default.error(error.message, error?.data));
        }
    }
    async unVerifiedHospitals() {
        const data = await this.prisma.hospital.findMany({
            where: {
                isVerified: false,
            },
        });
        if (!data) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Hospitals not found'));
        }
        return response_helper_1.default.success('Hospitals found successfully', data);
    }
    async verifyHospital(id) {
        const data = await this.prisma.hospital.update({
            where: {
                id: id,
            },
            data: {
                isVerified: true,
            },
        });
        return response_helper_1.default.success('Hospital verified successfully', data);
    }
    async queuePatients(hospital_id) {
        const visit_date = new Date();
        const startDate = new Date(visit_date);
        const endDate = new Date(visit_date);
        endDate.setDate(endDate.getDate() + 1);
        const data = await this.prisma.visit.findMany({
            where: {
                hospital_id: hospital_id,
                status: 'QUEUE',
            },
            include: {
                doctor: true,
                patient: true,
            },
        });
        if (!data) {
            return response_helper_1.default.success('Patients not found', data);
        }
        return response_helper_1.default.success('Data fetched successfully', data);
    }
    async onGoingPatients(hospital_id) {
        const visit_date = new Date();
        const startDate = new Date(visit_date);
        const endDate = new Date(visit_date);
        endDate.setDate(endDate.getDate() + 1);
        const data = await this.prisma.visit.findMany({
            where: {
                hospital_id: hospital_id,
                status: 'ON_GOING',
            },
            include: {
                doctor: true,
                patient: true,
            },
        });
        if (!data) {
            return response_helper_1.default.success('Patients not found', data);
        }
        return response_helper_1.default.success('Data fetched successfully', data);
    }
    async updateStatus(visit_id, status) {
        const visit = await this.prisma.visit.update({
            where: {
                id: visit_id,
            },
            data: {
                status: status,
            },
        });
    }
    async createPatient(createPatientDto) {
        let details;
        let tokenNo;
        let isoDto = new Date().toISOString();
        tokenNo = isoDto
            .toString()
            .replace(/-/g, '')
            .replace('T', '')
            .replace(':', '-')
            .replace(':', '')
            .slice(0, 15);
        const user = await this.prisma.user.findUnique({
            where: {
                phone: createPatientDto.phone,
            },
            select: {
                patients: true,
            },
        });
        if (!user) {
            details = await this.prisma.user.create({
                data: {
                    phone: createPatientDto.phone,
                    patients: {
                        create: {
                            first_name: createPatientDto.firstName,
                            last_name: createPatientDto.lastName,
                            middle_name: createPatientDto.middleName,
                            visits: {
                                create: {
                                    reason: createPatientDto.reason,
                                    doctor_id: createPatientDto.doctorId || undefined,
                                    visit_date: new Date().toISOString(),
                                    hospital_id: createPatientDto.hospital_id,
                                    tokenNo: tokenNo,
                                },
                            },
                        },
                    },
                },
                select: {
                    patients: {
                        select: {
                            visits: true,
                        },
                    },
                },
            });
        }
        else if (!user.patients?.find((p) => p.first_name == createPatientDto.firstName &&
            p.last_name == createPatientDto.lastName &&
            p.gender == createPatientDto.gender)) {
            details = await this.prisma.user.update({
                where: {
                    phone: createPatientDto.phone,
                },
                data: {
                    patients: {
                        create: {
                            first_name: createPatientDto.firstName,
                            last_name: createPatientDto.lastName,
                            middle_name: createPatientDto.middleName,
                            visits: {
                                create: {
                                    reason: createPatientDto.reason,
                                    doctor_id: createPatientDto.doctorId || undefined,
                                    visit_date: new Date().toISOString(),
                                    hospital_id: createPatientDto.hospital_id,
                                    tokenNo: tokenNo,
                                },
                            },
                        },
                    },
                },
                include: {
                    patients: {
                        select: {
                            visits: true,
                        },
                    },
                },
            });
        }
        else {
            details = await this.prisma.user.update({
                where: {
                    phone: createPatientDto.phone,
                },
                data: {
                    patients: {
                        update: {
                            where: {
                                id: user.patients.find((p) => p.first_name === createPatientDto.firstName &&
                                    p.last_name === createPatientDto.lastName &&
                                    p.gender === createPatientDto.gender).id,
                            },
                            data: {
                                first_name: createPatientDto.firstName,
                                last_name: createPatientDto.lastName,
                                middle_name: createPatientDto.middleName,
                                visits: {
                                    create: {
                                        reason: createPatientDto.reason,
                                        doctor_id: createPatientDto.doctorId || undefined,
                                        visit_date: new Date(),
                                        hospital_id: createPatientDto.hospital_id,
                                        tokenNo: tokenNo,
                                    },
                                },
                            },
                        },
                    },
                },
            });
        }
        return response_helper_1.default.success('Patient created successfully', details);
    }
    async findAllDataFromOneHospital(hospital_id, user) {
        const data = await this.prisma.hospital.findUnique({
            where: {
                id: hospital_id,
                admins: {
                    some: {
                        id: user.id,
                    },
                },
            },
            include: {
                visits: {
                    where: {
                        visit_date: {
                            gte: new Date(),
                        },
                    },
                    select: {
                        visit_date: true,
                        reason: true,
                        treatments: {
                            select: {
                                treatment_name: true,
                                diagnosis: true,
                            },
                        },
                        patient: {
                            select: {
                                first_name: true,
                                revisit_interval: true,
                                gender: true,
                                blood_group: true,
                            },
                        },
                    },
                },
            },
        });
        return response_helper_1.default.success('Available history Records', data);
    }
    async listOfPatients(id, user) {
        const data = await this.prisma.hospital.findUnique({
            where: {
                id: id,
                admins: {
                    some: {
                        id: user.id,
                    },
                },
            },
            include: {
                visits: {
                    select: {
                        patient: true,
                    },
                },
            },
        });
        const patients = data.visits.map((visit) => visit.patient);
        return response_helper_1.default.success('Available history Records', patients);
    }
    async findAllHospital() {
        const data = await this.prisma.hospital.findMany();
        return response_helper_1.default.success('All hospitals', data);
    }
    async findHospitalById(id) {
        const data = await this.prisma.hospital.findUnique({
            where: {
                id: id,
            },
            include: {},
        });
        return response_helper_1.default.success('All hospitals', data);
    }
    async findHospital(id) {
        const data = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                hospitals: {
                    select: {
                        id: true,
                        hospital_name: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('All hospitals', data);
    }
    findOnePatient(id, user) {
        return `This action returns a #${id} hospital`;
    }
    async update(id, updateHospitalDto) {
        const hospital = await this.prisma.hospital.findUnique({
            where: {
                id: id,
            },
        });
        if (!hospital) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Hospital not found'));
        }
        const updatedHospital = await this.prisma.hospital.update({
            where: {
                id: id,
            },
            data: {
                hospital_name: updateHospitalDto.hospital_name,
                location: updateHospitalDto.location,
                contact_info: updateHospitalDto.contact_info,
                infoMail: updateHospitalDto.infoMail,
                about: updateHospitalDto.about,
                established: updateHospitalDto.established,
                province: updateHospitalDto.province,
                district: updateHospitalDto.district,
                ward: updateHospitalDto.ward,
                street: updateHospitalDto.street,
                licenseNumber: updateHospitalDto.licenseNumber,
                licenseExpiry: updateHospitalDto.licenseExpiry,
                latitude: updateHospitalDto.latitude,
                longitude: updateHospitalDto.longitude,
                emergencyPhone: updateHospitalDto.emergencyPhone,
                rating: 0,
                adminPhone: updateHospitalDto.adminPhone,
            },
        });
        return response_helper_1.default.success('Hospital updated successfully', updatedHospital);
    }
    async remove(id, user) {
        let hospital = undefined;
        let userDetails = await this.prisma.user.findUnique({
            where: {
                id: user.id,
            },
            include: {
                roles: true,
            },
        });
        if (userDetails.roles.map((r) => r.name).includes('HOSPITAL')) {
            userDetails = await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    hospitals: {
                        disconnect: {
                            id: id,
                        },
                    },
                },
                include: {
                    roles: true,
                },
            });
        }
        else if (userDetails.roles.map((r) => r.name).includes('ADMIN')) {
            hospital = await this.prisma.hospital.findUnique({
                where: {
                    id: id,
                },
                include: {
                    admins: true,
                },
            });
            if (!hospital) {
                throw new common_1.NotFoundException('Hospital not found');
            }
            await this.prisma.hospital.delete({
                where: {
                    id: id,
                },
            });
        }
        else {
            throw new common_1.ForbiddenException('You are not authorized to delete this user');
        }
    }
};
exports.HospitalService = HospitalService;
exports.HospitalService = HospitalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HospitalService);
//# sourceMappingURL=hospital.service.js.map