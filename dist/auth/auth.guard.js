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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_helper_1 = require("../helper/response-helper");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if (!authorization) {
            throw new common_1.UnauthorizedException(response_helper_1.default.error('Token not found'));
        }
        const token = authorization && authorization.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException(response_helper_1.default.error('Invalid Token Formate'));
        }
        let decoded;
        try {
            decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException(response_helper_1.default.error('Malformed token'));
        }
        if (!decoded) {
            throw new common_1.UnauthorizedException(response_helper_1.default.error('Invalid token'));
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            include: {
                hospitals: {
                    select: {
                        hospital_name: true,
                        id: true,
                    },
                },
                doctor: {
                    select: {
                        id: true,
                    },
                },
                roles: {
                    select: {
                        name: true,
                    },
                }
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(response_helper_1.default.error('User not found'));
        }
        request.user = user;
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map