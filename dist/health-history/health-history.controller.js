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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthHistoryController = void 0;
const common_1 = require("@nestjs/common");
const health_history_service_1 = require("./health-history.service");
const roles_decorator_1 = require("../roles/roles.decorator");
const current_user_decorator_1 = require("../current-user/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../roles/roles.guard");
let HealthHistoryController = class HealthHistoryController {
    constructor(healthHistoryService) {
        this.healthHistoryService = healthHistoryService;
    }
    getAll(params) {
        return this.healthHistoryService.getAllHistory(params);
    }
    getAllHistoryOfOnePatientByDoctor(id, params, user) {
        return this.healthHistoryService.getAllHistoryOfOnePatientByDoctor(id, params, user);
    }
    getAllHistoryOfOneHospital(params, user) {
        return this.healthHistoryService.getAllHistoryOfOneHospital(params, user);
    }
    getAllOwnHistory(params, user) {
        return this.healthHistoryService.getAllOwnHistory(params, user);
    }
    getOneVisit(id, user) {
        return this.healthHistoryService.getOneVisit(id, user);
    }
    getOneHistory(id) {
        return this.healthHistoryService.getOneHistory(id);
    }
};
exports.HealthHistoryController = HealthHistoryController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HealthHistoryController.prototype, "getAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('DOCTOR', 'ADMIN', 'HOSPITAL_ADMIN'),
    (0, common_1.Get)('/patient/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], HealthHistoryController.prototype, "getAllHistoryOfOnePatientByDoctor", null);
__decorate([
    (0, roles_decorator_1.Roles)('HOSPITAL_ADMIN'),
    (0, common_1.Get)('/hospital'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HealthHistoryController.prototype, "getAllHistoryOfOneHospital", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/own'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HealthHistoryController.prototype, "getAllOwnHistory", null);
__decorate([
    (0, common_1.Get)('visit/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], HealthHistoryController.prototype, "getOneVisit", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HealthHistoryController.prototype, "getOneHistory", null);
exports.HealthHistoryController = HealthHistoryController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('api/health-history'),
    __metadata("design:paramtypes", [health_history_service_1.HealthHistoryService])
], HealthHistoryController);
//# sourceMappingURL=health-history.controller.js.map