"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaqDto = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const createFaqDto = (item) => {
    return {
        id: item.id,
        title: item.attributes.Name,
        content: item.attributes.Content,
        date: item.attributes.Date,
        dateObj: (0, dayjs_1.default)(item.attributes.Date).toDate(),
    };
};
exports.createFaqDto = createFaqDto;
//# sourceMappingURL=faq.dto.js.map