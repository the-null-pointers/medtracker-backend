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
exports.GenerateAdminsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let GenerateAdminsService = class GenerateAdminsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRoles(createGenerateAdminDto) {
        const generateAdmins = await this.prisma.role.createMany({
            data: createGenerateAdminDto.roles,
        });
        const admin = await this.prisma.user.create({
            data: {
                phone: '0000000000',
                email: 'test@gmail.com',
                roles: {
                    connect: createGenerateAdminDto.roles,
                },
            },
        });
        const patients = await this.prisma.patient.createMany({
            data: [
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    middle_name: 'A',
                    user_id: admin.id,
                },
                {
                    first_name: 'Jane',
                    last_name: 'Doe',
                    middle_name: 'B',
                    user_id: admin.id,
                },
                {
                    first_name: 'Bob',
                    last_name: 'Smith',
                    middle_name: 'C',
                    user_id: admin.id,
                },
                {
                    first_name: 'Alice',
                    last_name: 'Johnson',
                    middle_name: 'D',
                    user_id: admin.id,
                },
                {
                    first_name: 'Charlie',
                    last_name: 'Williams',
                    middle_name: 'E',
                    user_id: admin.id,
                },
            ],
        });
        const hospitals = await this.prisma.hospital.createMany({
            data: [
                {
                    hospital_name: 'Hospital A',
                    adminPhone: '0000000000',
                    about: 'About Hospital A',
                    location: 'Location A',
                    contact_info: 'Contact Info A',
                    isVerified: true,
                },
            ],
        });
        if (!generateAdmins || !admin || !patients || !hospitals) {
            throw new Error('Error creating generateAdmins');
        }
        return response_helper_1.default.success('Admin created successfully', {
            generateAdmins,
            admin,
            patients,
            hospitals,
        });
    }
    findAll() {
        return `This action returns all generateAdmins`;
    }
    findOne(id) {
        return `This action returns a #${id} generateAdmin`;
    }
    update(id, updateGenerateAdminDto) {
        return `This action updates a #${id} generateAdmin`;
    }
    remove(id) {
        return `This action removes a #${id} generateAdmin`;
    }
};
exports.GenerateAdminsService = GenerateAdminsService;
exports.GenerateAdminsService = GenerateAdminsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GenerateAdminsService);
//# sourceMappingURL=generate-admins.service.js.map