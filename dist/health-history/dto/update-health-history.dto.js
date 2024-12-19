"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHealthHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_health_history_dto_1 = require("./create-health-history.dto");
class UpdateHealthHistoryDto extends (0, swagger_1.PartialType)(create_health_history_dto_1.CreateHealthHistoryDto) {
}
exports.UpdateHealthHistoryDto = UpdateHealthHistoryDto;
//# sourceMappingURL=update-health-history.dto.js.map