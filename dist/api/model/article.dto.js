"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticleDto = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const createArticleDto = (item) => {
    return {
        id: item.id,
        title: item.attributes.title,
        content: item.attributes.content,
        date: item.attributes.date,
        dateObj: (0, dayjs_1.default)(item.attributes.date).toDate(),
    };
};
exports.createArticleDto = createArticleDto;
//# sourceMappingURL=article.dto.js.map