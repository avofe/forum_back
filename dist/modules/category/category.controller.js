"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const service = new category_service_1.CategoryService();
class CategoryController {
    async createCategory(req, res) {
        const category = await service.createCategory(req.body);
        res.json(category);
    }
    async getAllCategory(req, res) {
        const category = await service.getAllCategory();
        res.json(category);
    }
    async getCategoryById(req, res) {
        const id = Number(req.params.id);
        const category = await service.getCategoryById(id);
        res.json(category);
    }
    async getAllWithCount(req, res) {
        const category = await service.getAllWithCount();
        res.json(category);
    }
    async deleteCategory(req, res) {
        const id = Number(req.params.id);
        await service.deleteCategory(id);
        res.json({ message: "Deleted" });
    }
}
exports.CategoryController = CategoryController;
