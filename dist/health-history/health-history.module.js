"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const health_history_service_1 = require("./health-history.service");
const health_history_controller_1 = require("./health-history.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let HealthHistoryModule = class HealthHistoryModule {
};
exports.HealthHistoryModule = HealthHistoryModule;
exports.HealthHistoryModule = HealthHistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [health_history_controller_1.HealthHistoryController],
        providers: [health_history_service_1.HealthHistoryService, prisma_service_1.PrismaService, jwt_1.JwtService],
    })
], HealthHistoryModule);
//# sourceMappingURL=health-history.module.js.map