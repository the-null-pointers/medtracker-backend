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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_1 = require("../helper/response-helper");
let RolesService = class RolesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoleDto) {
        const role = await this.prisma.role.findUnique({
            where: {
                name: createRoleDto.name,
            },
        });
        if (role) {
            throw new common_1.BadRequestException(response_helper_1.default.error('Role already exist'));
        }
        const roles = await this.prisma.role.create({
            data: {
                name: createRoleDto.name,
            },
        });
        return response_helper_1.default.success('Role created successfully', roles);
    }
    async findAll() {
        return await this.prisma.role.findMany();
    }
    async findOne(id) {
        const role = await this.prisma.role.findUnique({
            where: {
                id: id,
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Role not found'));
        }
        return response_helper_1.default.success('Role fetched successfully', role);
    }
    async update(id, updateRoleDto) {
        const role = await this.prisma.role.findUnique({
            where: {
                id: id,
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Role not found'));
        }
        const updatedRole = await this.prisma.role.update({
            where: {
                id: id,
            },
            data: {
                name: updateRoleDto.name,
            },
        });
        return response_helper_1.default.success('Role updated successfully', updatedRole);
    }
    async remove(id) {
        const role = await this.prisma.role.findUnique({
            where: {
                id: id,
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(response_helper_1.default.error('Role not found'));
        }
        const deletedRole = await this.prisma.role.delete({
            where: {
                id: id,
            },
        });
        return response_helper_1.default.success('Role deleted successfully', deletedRole);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map