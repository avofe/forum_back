"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const db_1 = __importDefault(require("../../config/db"));
class CategoryService {
    async createCategory(category) {
        return db_1.default.category.create({
            data: {
                name: category.name,
                slug: category.slug,
            },
        });
    }
    async getAllCategory() {
        return db_1.default.category.findMany();
    }
    async getAllWithCount() {
        const category = await db_1.default.category.findMany();
        const count = await db_1.default.category.count();
        return { category, count };
    }
    async getCategoryById(id) {
        return db_1.default.category.findUnique({
            where: { id },
            include: {
                products: true,
                _count: { select: { products: true } },
            },
        });
    }
    async deleteCategory(id) {
        return db_1.default.category.delete({ where: { id } });
    }
}
exports.CategoryService = CategoryService;
