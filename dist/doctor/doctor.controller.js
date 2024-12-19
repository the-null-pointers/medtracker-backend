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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
const create_doctor_dto_1 = require("./dto/create-doctor.dto");
const update_doctor_dto_1 = require("./dto/update-doctor.dto");
const roles_decorator_1 = require("../roles/roles.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../roles/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../current-user/current-user.decorator");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    create(createDoctorDto) {
        return this.doctorService.create(createDoctorDto);
    }
    findAll() {
        return this.doctorService.allDoctors();
    }
    doctorsInHospital(user, hospital_id) {
        return this.doctorService.doctorsInHospital(+hospital_id, user);
    }
    findOne(id, user) {
        return this.doctorService.doctorDetails(+id, user.id);
    }
    patientsOfOneDoctor(hospital_id, user) {
        return this.doctorService.patientsOfOneDoctor(user?.doctor?.id, +hospital_id);
    }
    detailsOfOnePatientByDoctor(visit_id, hospital_id, user) {
        return this.doctorService.detailsOfOnePatientByDoctor(user?.doctor?.id, +visit_id, +hospital_id);
    }
    associateHospitalsOfDoctor(user) {
        return this.doctorService.associateHospitalsOfDoctor(user?.doctor?.id);
    }
    update(id, updateDoctorDto) {
        return this.doctorService.update(+id, updateDoctorDto);
    }
    remove(id) {
        return this.doctorService.remove(+id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('HOSPITAL'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("all"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('one-hospital-doctors/:hospital_id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('HOSPITAL'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('hospital_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "doctorsInHospital", null);
__decorate([
    (0, common_1.Get)(':hospital_id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('DOCTOR', 'HOSPITAL'),
    __param(0, (0, common_1.Param)('hospital_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('patients-queue/:hospital_id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('DOCTOR'),
    __param(0, (0, common_1.Param)('hospital_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "patientsOfOneDoctor", null);
__decorate([
    (0, common_1.Get)('details-of-one-patient-by-doctor'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('DOCTOR'),
    __param(0, (0, common_1.Param)('visit_id')),
    __param(1, (0, common_1.Param)('hospital_id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "detailsOfOnePatientByDoctor", null);
__decorate([
    (0, common_1.Get)('associate-hospitals-of-doctor'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('DOCTOR'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "associateHospitalsOfDoctor", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('DOCTOR', 'ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('DOCTOR', 'ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "remove", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('api/doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map