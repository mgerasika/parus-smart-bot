"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.article = void 0;
const env_constant_1 = require("../../constants/env.constant");
const collection_1 = require("../../utils/collection");
const use_query_utils_1 = require("../../utils/use-query.utils");
const article_dto_1 = require("../model/article.dto");
const useGetArticlesAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, use_query_utils_1.useQueryAsync)({
        url: `${env_constant_1.ENV.STRAPI_URL}api/articles?token=${env_constant_1.ENV.STRAPI_TOKEN}`,
    });
    return Object.assign(Object.assign({}, res), { data: res.data
            ? (0, collection_1.createCollection)(res.data.data.map((article) => (0, article_dto_1.createArticleDto)(article)) || [])
            : undefined });
});
exports.article = {
    useGetArticlesAsync,
};
//# sourceMappingURL=article.hook.js.map