"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const db_1 = __importDefault(require("../../config/db"));
class ProductService {
    async createProduct(data) {
        return db_1.default.product.create({ data });
    }
    async getAllProducts() {
        const products = await db_1.default.product.findMany();
        const count = await db_1.default.product.count();
        return { products, count };
    }
    async getProductById(id) {
        return db_1.default.product.findUnique({ where: { id } });
    }
    async updateProduct(id, data) {
        return db_1.default.product.update({ where: { id }, data });
    }
    async deleteProduct(id) {
        return db_1.default.product.delete({ where: { id } });
    }
    async findProducts(query) {
        return db_1.default.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
        });
    }
    async filterProducts(filter) {
        const { categoryId, brand = [], stock = [], minValue, maxValue } = filter;
        const where = {};
        if (categoryId !== undefined) {
            where.categoryId = Number(categoryId);
        }
        if (brand.length > 0) {
            where.brand = { in: brand };
        }
        if (stock.length > 0) {
            const orStock = [];
            if (stock.includes("Да"))
                orStock.push({ stock: { gt: 0 } });
            if (stock.includes("Нет"))
                orStock.push({ stock: 0 });
            if (orStock.length > 0) {
                where.AND = where.AND || [];
                where.AND.push({ OR: orStock });
            }
        }
        if (minValue !== undefined || maxValue !== undefined) {
            const priceCondition = {};
            if (minValue !== undefined)
                priceCondition.gte = minValue;
            if (maxValue !== undefined)
                priceCondition.lte = maxValue;
            where.price = priceCondition;
        }
        const products = await db_1.default.product.findMany({ where });
        const count = await db_1.default.product.count({ where });
        return { products, count };
    }
}
exports.ProductService = ProductService;
