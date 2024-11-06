"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishValidator = void 0;
const zod_1 = __importDefault(require("zod"));
exports.DishValidator = zod_1.default.object({
    title: zod_1.default.string().min(1),
    price: zod_1.default.number().min(1),
    description: zod_1.default.string().min(1),
    category: zod_1.default.string().min(1),
    image: zod_1.default.string().min(1),
});
