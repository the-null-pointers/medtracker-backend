"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    success(message, data) {
        if (!data) {
            return {
                success: true,
                status: 'success',
                message: message,
            };
        }
        return {
            success: true,
            status: 'success',
            message: message,
            data: data,
        };
    }
    error(message, data) {
        if (!data) {
            return {
                success: false,
                status: 'failure',
                message: message,
            };
        }
        return {
            success: false,
            status: 'failure',
            message: message,
            error: data,
        };
    }
}
exports.default = new ResponseHelper();
//# sourceMappingURL=response-helper.js.map