import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const service = new CategoryService();

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    const category = await service.createCategory(req.body);
    res.json(category);
  }

  async getAllCategory(req: Request, res: Response) {
    const category = await service.getAllCategory();
    res.json(category);
  }

  async getCategoryById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const category = await service.getCategoryById(id);
    res.json(category);
  }

  async getAllWithCount(req: Request, res: Response) {
    const category = await service.getAllWithCount();
    res.json(category);
  }

  async deleteCategory(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.deleteCategory(id);
    res.json({ message: "Deleted" });
  }
}
