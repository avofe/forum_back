import { Request, Response } from "express";
import { ProductService } from "./product.service";

const service = new ProductService();

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const file = req.file;

      const { name, brand, model, description, price, stock, categoryId } =
        req.body;

      const productData = {
        name,
        brand,
        model,
        description,
        price: Number(price),
        stock: stock ? Number(stock) : 0,
        categoryId: Number(categoryId),
        imageUrl: file ? `/uploads/products/${file.filename}` : undefined,
      };

      const product = await service.createProduct(productData);
      res.status(201).json(product);
    } catch {
      res.status(500).json({ message: "Ошибка при создании товара" });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const users = await service.getAllProducts();
      res.json(users);
    } catch {
      res.status(500).json({ message: "Ошибка при получении товаров" });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await service.getProductById(id);
      if (!user) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      res.json(user);
    } catch {
      res.status(500).json({ message: "Ошибка при получении товара" });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await service.updateProduct(id, req.body);
      res.json(user);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("RecordNotFound")) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      res.status(500).json({ message: "Ошибка при обновлении товара" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.deleteProduct(id);
      res.json({ message: "Deleted" });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("RecordNotFound")) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      res.status(500).json({ message: "Ошибка при удалении товара" });
    }
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
    } catch {
      res.status(500).json({ message: "Ошибка поиска" });
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
    } catch {
      res.status(500).json({ message: "Ошибка фильтрации" });
    }
  }
}
