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
exports.LabReportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let LabReportService = class LabReportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLabReportDto) {
        const labReport = await this.prisma.labReport.create({
            data: createLabReportDto,
        });
        return response_helper_1.default.success('Lab Report created successfully', labReport);
    }
    async findAll() {
        const labReports = await this.prisma.labReport.findMany();
        if (!labReports) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Lab Reports not found'));
        }
        return response_helper_1.default.success('Lab Reports found successfully', {
            labReports: labReports,
        });
    }
    async findOne(id) {
        const labReport = await this.prisma.labReport.findUnique({
            where: {
                id: id,
            },
        });
        if (!labReport) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Lab Report not found'));
        }
        return response_helper_1.default.success('Lab Report found successfully', labReport);
    }
    async update(id, updateLabReportDto) {
        const labReport = await this.prisma.labReport.findUnique({
            where: {
                id: id,
            },
        });
        if (!labReport) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Lab Report not found'));
        }
        const updatedLabReport = await this.prisma.labReport.update({
            where: {
                id: id,
            },
            data: updateLabReportDto,
        });
        return response_helper_1.default.success('Lab Report updated successfully', updatedLabReport);
    }
    async remove(id) {
        const labReport = await this.prisma.labReport.findUnique({
            where: {
                id: id,
            },
        });
        if (!labReport) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Lab Report not found'));
        }
        const deletedLabReport = await this.prisma.labReport.delete({
            where: {
                id: id,
            },
        });
        return response_helper_1.default.success('Lab Report deleted successfully', deletedLabReport);
    }
};
exports.LabReportService = LabReportService;
exports.LabReportService = LabReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LabReportService);
//# sourceMappingURL=lab-report.service.js.map