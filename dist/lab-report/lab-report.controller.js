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
exports.LabReportController = void 0;
const common_1 = require("@nestjs/common");
const lab_report_service_1 = require("./lab-report.service");
const create_lab_report_dto_1 = require("./dto/create-lab-report.dto");
const update_lab_report_dto_1 = require("./dto/update-lab-report.dto");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../roles/roles.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
(0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard);
let LabReportController = class LabReportController {
    constructor(labReportService) {
        this.labReportService = labReportService;
    }
    create(createLabReportDto) {
        return this.labReportService.create(createLabReportDto);
    }
    findAll() {
        return this.labReportService.findAll();
    }
    findOne(id) {
        return this.labReportService.findOne(+id);
    }
    update(id, updateLabReportDto) {
        return this.labReportService.update(+id, updateLabReportDto);
    }
    remove(id) {
        return this.labReportService.remove(+id);
    }
};
exports.LabReportController = LabReportController;
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'LAB_ASSISTANT', 'DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lab_report_dto_1.CreateLabReportDto]),
    __metadata("design:returntype", void 0)
], LabReportController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'LAB_ASSISTANT', 'DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LabReportController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'LAB_ASSISTANT', 'DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabReportController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'LAB_ASSISTANT', 'DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lab_report_dto_1.UpdateLabReportDto]),
    __metadata("design:returntype", void 0)
], LabReportController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'LAB_ASSISTANT', 'DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabReportController.prototype, "remove", null);
exports.LabReportController = LabReportController = __decorate([
    (0, common_1.Controller)('api/lab-report'),
    __metadata("design:paramtypes", [lab_report_service_1.LabReportService])
], LabReportController);
//# sourceMappingURL=lab-report.controller.js.map