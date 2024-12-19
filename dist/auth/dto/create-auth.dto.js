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
exports.UpdateUserDto = exports.VerfiyEmailRegisterDto = exports.EmailRegisterDto = exports.VerfiyRegisterDto = exports.RegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '98xxxx' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
class VerfiyRegisterDto {
}
exports.VerfiyRegisterDto = VerfiyRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '98xxxx' }),
    __metadata("design:type", String)
], VerfiyRegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    __metadata("design:type", String)
], VerfiyRegisterDto.prototype, "otp", void 0);
class EmailRegisterDto {
}
exports.EmailRegisterDto = EmailRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@gmail.com' }),
    __metadata("design:type", String)
], EmailRegisterDto.prototype, "email", void 0);
class VerfiyEmailRegisterDto {
}
exports.VerfiyEmailRegisterDto = VerfiyEmailRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: ' john@gmail.com' }),
    __metadata("design:type", String)
], VerfiyEmailRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    __metadata("design:type", String)
], VerfiyEmailRegisterDto.prototype, "otp", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '98xxxx' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@gmail.com' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
//# sourceMappingURL=create-auth.dto.js.map