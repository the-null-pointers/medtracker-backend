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
exports.TreatmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let TreatmentService = class TreatmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addTreatment(createTreatmentDto, user) {
        if (!user?.doctor?.id) {
            throw new common_1.ForbiddenException(response_helper_1.default.error('You are not a doctor'));
        }
        const visit = await this.prisma.visit.findUnique({
            where: {
                id: createTreatmentDto.visit_id,
            },
        });
        if (!visit) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Visit not found'));
        }
        if (!visit.doctor_id) {
            await this.prisma.visit.update({
                where: {
                    id: visit.id,
                },
                data: {
                    doctor_id: user?.doctor.id,
                },
            });
        }
        const treatment = await this.prisma.treatment.create({
            data: {
                treatment_name: createTreatmentDto.treatment_name,
                symptoms: createTreatmentDto.symptoms,
                diagnosis: createTreatmentDto.diagnosis,
                treatment_date: createTreatmentDto.treatment_date,
                visit_id: visit.id,
                doctor_id: user?.doctor?.id,
            },
        });
        const prescription = await this.prisma.prescription.createMany({
            data: createTreatmentDto.prescriptions.map((prescription) => ({
                medication_name: prescription.medication_name,
                dosage: prescription.dosage,
                frequency: prescription.frequency,
                visit_id: visit.id,
                patient_id: visit.patient_id,
                start_date: prescription.start_date,
                end_date: prescription.end_date,
                doctor_id: user?.doctor?.id || undefined,
            })),
        });
        return response_helper_1.default.success('Treatment added successfully', {
            treatment,
            prescription,
        });
    }
    async findAll() {
        const treatments = await this.prisma.treatment.findMany();
        if (!treatments) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Treatments not found'));
        }
        return response_helper_1.default.success('Treatments found successfully', {
            treatments,
        });
    }
    async findOne(id) {
        const treatment = await this.prisma.treatment.findUnique({
            where: {
                id: id,
            },
        });
        if (!treatment) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Treatment not found'));
        }
        return response_helper_1.default.success('Treatment found successfully', treatment);
    }
    async update(updateTreatmentDto) {
        let treatment = await this.prisma.treatment.findFirst({
            where: {
                visit_id: updateTreatmentDto.visit_id,
            },
        });
        if (!treatment) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Treatment not found'));
        }
        let newTreatment = await this.prisma.treatment.update({
            where: {
                id: treatment.id,
            },
            data: {
                treatment_name: updateTreatmentDto.treatment_name,
                symptoms: updateTreatmentDto.symptoms,
                diagnosis: updateTreatmentDto.diagnosis,
                treatment_date: updateTreatmentDto.treatment_date,
            },
        });
        let visit = await this.prisma.visit.findUnique({
            where: {
                id: updateTreatmentDto.visit_id,
            },
        });
        if (!visit) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Visit not found'));
        }
        visit = await this.prisma.visit.update({
            where: {
                id: updateTreatmentDto.visit_id,
            },
            data: {
                prescriptions: {
                    createMany: {
                        data: updateTreatmentDto.prescriptions.map((prescription) => ({
                            medication_name: prescription.medication_name,
                            dosage: prescription.dosage,
                            frequency: prescription.frequency,
                            start_date: prescription.start_date,
                            end_date: prescription.end_date,
                            patient_id: visit.patient_id,
                            doctor_id: visit.doctor_id,
                        })),
                    },
                },
            },
        });
        return response_helper_1.default.success('Treatment updated successfully', treatment);
    }
    async updateTreatment(id, updateTreatmentDto) {
        let visit = await this.prisma.visit.findUnique({
            where: {
                id: updateTreatmentDto.visit_id,
            },
        });
        if (!visit) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Visit not found'));
        }
    }
};
exports.TreatmentService = TreatmentService;
exports.TreatmentService = TreatmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TreatmentService);
//# sourceMappingURL=treatment.service.js.map