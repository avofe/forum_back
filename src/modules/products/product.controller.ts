import { Request, Response } from "express";
import { ProductService } from "./product.service";

const service = new ProductService();

export class UserController {
  async createProduct(req: Request, res: Response) {
    const user = await service.createProduct(req.body);
    res.json(user);
  }

  async getAllProducts(req: Request, res: Response) {
    const users = await service.getAllProducts();
    res.json(users);
  }

  async getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await service.getProductById(id);
    res.json(user);
  }

  async updateProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await service.updateProduct(id, req.body);
    res.json(user);
  }

  async deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.deleteProduct(id);
    res.json({ message: "Deleted" });
  }

  async findProductsByName(req: Request, res: Response) {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    try {
      const products = await service.findProducts(q);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Ошибка поиска", error: error });
    }
  }

  async filterProducts(req: Request, res: Response) {
    try {
      const { categoryId, brand, stock, minValue, maxValue } = req.query;

      const filter = {
        categoryId: categoryId ? Number(categoryId) : undefined,
        brand: brand ? (brand as string).split(",") : undefined,
        stock: stock ? (stock as string).split(",") : undefined,
        minValue: minValue ? Number(minValue) : undefined,
        maxValue: maxValue ? Number(maxValue) : undefined,
      };

      const { products, count } = await service.filterProducts(filter);
      res.json({ products, count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка фильтрации", error });
    }
  }
}
