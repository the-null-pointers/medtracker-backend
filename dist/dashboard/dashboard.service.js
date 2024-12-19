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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDoctorStats(id) {
        const data = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                doctor: {
                    select: {
                        _count: true,
                        id: true,
                        visits: {
                            where: {
                                visit_date: {
                                    gte: new Date(),
                                },
                            },
                        },
                    },
                },
            },
        });
        const visitGraph = await this.prisma.visit.findMany({
            where: {
                doctor_id: data.doctor.id,
            },
            select: {
                visit_date: true,
            },
        });
        const monthlyCounts = Array(12).fill(0);
        visitGraph.forEach((visit) => {
            const visitMonth = new Date(visit.visit_date).getMonth();
            monthlyCounts[visitMonth]++;
        });
        const result = monthlyCounts.map((count, month) => ({
            month,
            count,
        }));
        if (!data) {
            throw new common_1.NotFoundException(response_helper_1.default.error('User not found'));
        }
        return response_helper_1.default.success('User found successfully', {
            doctor: {
                ...data.doctor._count,
                id: data.doctor.id,
            },
            visitGraph: result,
        });
    }
    async getHospitalStats(id, hospital_id) {
        const data = await this.prisma.hospital.findUnique({
            where: {
                id: hospital_id,
            },
            select: {
                doctors: true,
                admins: true,
                visits: true,
                _count: true,
                id: true,
            },
        });
        if (!data) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Hospital not found'));
        }
        return response_helper_1.default.success('Hospital found successfully', {
            ...data,
        });
    }
    update(id, updateDashboardDto) {
        return `This action updates a #${id} dashboard`;
    }
    remove(id) {
        return `This action removes a #${id} dashboard`;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map