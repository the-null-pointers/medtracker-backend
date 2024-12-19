"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const middleware_middleware_1 = require("./middleware/middleware.middleware");
const profile_module_1 = require("./profile/profile.module");
const hospital_module_1 = require("./hospital/hospital.module");
const doctor_module_1 = require("./doctor/doctor.module");
const treatment_module_1 = require("./treatment/treatment.module");
const health_history_module_1 = require("./health-history/health-history.module");
const roles_module_1 = require("./roles/roles.module");
const lab_report_module_1 = require("./lab-report/lab-report.module");
const mailer_module_1 = require("./mailer/mailer.module");
const twilio_service_1 = require("./twilio/twilio.service");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const notification_module_1 = require("./notification/notification.module");
const generate_admins_module_1 = require("./generate-admins/generate-admins.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(middleware_middleware_1.MiddlewareMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule, profile_module_1.ProfileModule, hospital_module_1.HospitalModule, doctor_module_1.DoctorModule, treatment_module_1.TreatmentModule, health_history_module_1.HealthHistoryModule, roles_module_1.RolesModule, lab_report_module_1.LabReportModule, mailer_module_1.MailerModule, dashboard_module_1.DashboardModule, notification_module_1.NotificationModule, generate_admins_module_1.GenerateAdminsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, twilio_service_1.TwilioService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map