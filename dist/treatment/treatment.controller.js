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
exports.TreatmentController = void 0;
const common_1 = require("@nestjs/common");
const treatment_service_1 = require("./treatment.service");
const create_treatment_dto_1 = require("./dto/create-treatment.dto");
const update_treatment_dto_1 = require("./dto/update-treatment.dto");
const roles_decorator_1 = require("../roles/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const current_user_decorator_1 = require("../current-user/current-user.decorator");
const roles_guard_1 = require("../roles/roles.guard");
let TreatmentController = class TreatmentController {
    constructor(treatmentService) {
        this.treatmentService = treatmentService;
    }
    create(createTreatmentDto, user) {
        console.log(user);
        return this.treatmentService.addTreatment(createTreatmentDto, user);
    }
    findAll() {
        return this.treatmentService.findAll();
    }
    findOne(id) {
        return this.treatmentService.findOne(+id);
    }
    update(updateTreatmentDto) {
        return this.treatmentService.update(updateTreatmentDto);
    }
};
exports.TreatmentController = TreatmentController;
__decorate([
    (0, roles_decorator_1.Roles)('DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_treatment_dto_1.CreateTreatmentDto, Object]),
    __metadata("design:returntype", void 0)
], TreatmentController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreatmentController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('DOCTOR', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('DOCTOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_treatment_dto_1.UpdateTreatmentDto]),
    __metadata("design:returntype", void 0)
], TreatmentController.prototype, "update", null);
exports.TreatmentController = TreatmentController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('api/treatment'),
    __metadata("design:paramtypes", [treatment_service_1.TreatmentService])
], TreatmentController);
//# sourceMappingURL=treatment.controller.js.map