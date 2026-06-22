import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const service = new CategoryService();

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const category = await service.createCategory(req.body);
      res.status(201).json(category);
    } catch {
      res.status(500).json({ message: "Ошибка при создании категории" });
    }
  }

  async getAllCategory(req: Request, res: Response) {
    try {
      const category = await service.getAllCategory();
      res.json(category);
    } catch {
      res.status(500).json({ message: "Ошибка при получении категорий" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = await service.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Категория не найдена" });
      }
      res.json(category);
    } catch {
      res.status(500).json({ message: "Ошибка при получении категории" });
    }
  }

  async getAllWithCount(req: Request, res: Response) {
    try {
      const category = await service.getAllWithCount();
      res.json(category);
    } catch {
      res.status(500).json({ message: "Ошибка при получении категорий" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = await service.updateCategory(id, req.body);
      res.json(category);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("RecordNotFound")) {
        return res.status(404).json({ message: "Категория не найдена" });
      }
      res.status(500).json({ message: "Ошибка при обновлении категории" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.deleteCategory(id);
      res.json({ message: "Категория удалена" });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("RecordNotFound")) {
        return res.status(404).json({ message: "Категория не найдена" });
      }
      res.status(500).json({ message: "Ошибка при удалении категории" });
    }
  }
}
