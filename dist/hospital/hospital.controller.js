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
exports.HospitalController = void 0;
const common_1 = require("@nestjs/common");
const hospital_service_1 = require("./hospital.service");
const create_hospital_dto_1 = require("./dto/create-hospital.dto");
const update_hospital_dto_1 = require("./dto/update-hospital.dto");
const current_user_decorator_1 = require("../current-user/current-user.decorator");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_guard_1 = require("../roles/roles.guard");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let HospitalController = class HospitalController {
    constructor(hospitalService) {
        this.hospitalService = hospitalService;
    }
    createHospital(createHospitalDto, user) {
        return this.hospitalService.createHospital(createHospitalDto, user);
    }
    unVerifiedHospitals() {
        return this.hospitalService.unVerifiedHospitals();
    }
    verifyHospital(id) {
        return this.hospitalService.verifyHospital(id);
    }
    updateStatus(visit_id, status) {
        return this.hospitalService.updateStatus(+visit_id, status);
    }
    createPatient(createPatientDto, hospital) {
        return this.hospitalService.createPatient(createPatientDto);
    }
    findAll() {
        return this.hospitalService.findAllHospital();
    }
    findOneDayPatients(hospital_id) {
        return this.hospitalService.queuePatients(+hospital_id);
    }
    findOnGoingPatients(hospital_id) {
        return this.hospitalService.onGoingPatients(+hospital_id);
    }
    find(user) {
        return this.hospitalService.findHospital(user.id);
    }
    getDetails(id, user) {
        return this.hospitalService.findHospitalById(+id);
    }
    getPatientList(id, user) {
        return this.hospitalService.listOfPatients(+id, user);
    }
    update(id, updateHospitalDto) {
        return this.hospitalService.update(+id, updateHospitalDto);
    }
    remove(id, user) {
        return this.hospitalService.remove(+id, user);
    }
};
exports.HospitalController = HospitalController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('create-hospital'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hospital_dto_1.CreateHospitalDto, Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "createHospital", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('unverified-hospitals'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "unVerifiedHospitals", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('verify-hospital/:id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "verifyHospital", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiProperty)(),
    (0, common_1.Patch)('/:visit_id/:status'),
    (0, roles_decorator_1.Roles)('DOCTOR', 'ADMIN', 'HOSPITAL'),
    __param(0, (0, common_1.Param)('visit_id')),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('patients'),
    (0, roles_decorator_1.Roles)('HOSPITAL'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hospital_dto_1.CreatePatientFromHospitalDto, Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "createPatient", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('queue-patients/:hospital_id'),
    (0, roles_decorator_1.Roles)('HOSPITAL'),
    __param(0, (0, common_1.Param)('hospital_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "findOneDayPatients", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('on-going-patients/:hospital_id'),
    (0, roles_decorator_1.Roles)('HOSPITAL'),
    __param(0, (0, common_1.Param)('hospital_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "findOnGoingPatients", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(''),
    (0, roles_decorator_1.Roles)('HOSPITAL'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "find", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('HOSPITAL', 'DOCTOR'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getDetails", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('patient-list/:hospital_id'),
    (0, roles_decorator_1.Roles)('HOSPITAL'),
    __param(0, (0, common_1.Param)('hospital_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getPatientList", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('HOSPITAL', 'ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hospital_dto_1.UpdateHospitalDto]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('HOSPITAL', 'ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "remove", null);
exports.HospitalController = HospitalController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('api/hospital'),
    __metadata("design:paramtypes", [hospital_service_1.HospitalService])
], HospitalController);
//# sourceMappingURL=hospital.controller.js.map