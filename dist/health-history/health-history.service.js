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
exports.HealthHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let HealthHistoryService = class HealthHistoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllHistory(params) {
        const data = await this.prisma.healthHistory.findMany({
            skip: params.skip,
            take: params.take,
            where: {},
            orderBy: {
                created_at: 'desc',
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('Available history Records', data);
    }
    async getAllHistoryOfOneHospital(params, user) {
        const data = await this.prisma.healthHistory.findMany({
            skip: params.skip,
            take: params.take,
            where: {
                id: user.hospital_id,
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('Available history Records', data);
    }
    async getAllHistoryOfOnePatientByDoctor(id, params, user) {
        const data = await this.prisma.healthHistory.findMany({
            skip: params.skip,
            take: params.take,
            where: {
                patient_id: id,
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('Available history Records', data);
    }
    async getAllOwnHistory(params, user) {
        const data = await this.prisma.healthHistory.findMany({
            skip: params.skip,
            take: params.take,
            where: {
                patient_id: user.id,
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('Available history Records', data);
    }
    async getOneVisit(id, user) {
        const data = await this.prisma.visit.findUnique({
            where: {
                id: id,
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        user_id: true,
                    },
                },
                prescriptions: true,
                hospital: {
                    select: {
                        id: true,
                        hospital_name: true,
                    },
                },
                doctor: true,
                bills: true,
                treatments: true,
            },
        });
        if (data.patient.user_id !== user.id) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Patient does not exist', {
                patient: ['Patient does not exist'],
            }));
        }
        return response_helper_1.default.success('Available history Record', data);
    }
    async getOneHistory(id) {
        const data = await this.prisma.healthHistory.findUnique({
            where: {
                id: id,
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return response_helper_1.default.success('Available history Record', data);
    }
};
exports.HealthHistoryService = HealthHistoryService;
exports.HealthHistoryService = HealthHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HealthHistoryService);
//# sourceMappingURL=health-history.service.js.map