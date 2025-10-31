import prisma from "../../config/db";
import { IProductUpDate, IProduct, IFilter } from "./product.model";

export class ProductService {
  async createProduct(data: IProduct) {
    return prisma.product.create({ data });
  }

  async getAllProducts() {
    return prisma.product.findMany();
  }

  async getProductById(id: number) {
    return prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(id: number, data: IProductUpDate) {
    return prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number) {
    return prisma.product.delete({ where: { id } });
  }

  async findProducts(query: string) {
    return prisma.product.findMany({
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

  async filterProducts(filter: IFilter) {
    const { categoryId, brand = [], stock = [], minValue, maxValue } = filter;

    const where: any = {};

    if (categoryId !== undefined) {
      where.categoryId = Number(categoryId);
    }

    if (brand.length > 0) {
      where.brand = { in: brand };
    }

    if (stock.length > 0) {
      const orStock = [];
      if (stock.includes("Да")) orStock.push({ stock: { gt: 0 } });
      if (stock.includes("Нет")) orStock.push({ stock: 0 });

      if (orStock.length > 0) {
        where.AND = where.AND || [];
        where.AND.push({ OR: orStock });
      }
    }

    if (minValue !== undefined || maxValue !== undefined) {
      const priceCondition: any = {};
      if (minValue !== undefined) priceCondition.gte = minValue;
      if (maxValue !== undefined) priceCondition.lte = maxValue;
      where.price = priceCondition;
    }

    const products = await prisma.product.findMany({ where });

    const count = await prisma.product.count({ where });

    return { products, count };
  }
}
