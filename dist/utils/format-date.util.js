"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
dayjs_1.default.locale('ua');
const formatDate = (date) => {
    if (!date) {
        return '';
    }
    return (0, dayjs_1.default)(date).format('MMMM D, YYYY');
};
exports.formatDate = formatDate;
//# sourceMappingURL=format-date.util.js.map