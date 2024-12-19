"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabReportModule = void 0;
const common_1 = require("@nestjs/common");
const lab_report_service_1 = require("./lab-report.service");
const lab_report_controller_1 = require("./lab-report.controller");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let LabReportModule = class LabReportModule {
};
exports.LabReportModule = LabReportModule;
exports.LabReportModule = LabReportModule = __decorate([
    (0, common_1.Module)({
        controllers: [lab_report_controller_1.LabReportController],
        providers: [lab_report_service_1.LabReportService, prisma_service_1.PrismaService, jwt_1.JwtService],
    })
], LabReportModule);
//# sourceMappingURL=lab-report.module.js.map