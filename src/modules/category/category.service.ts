import prisma from "../../config/db";
import { ICategory } from "./category.model";

export class CategoryService {
  async createCategory(category: ICategory) {
    return prisma.category.create({
      data: {
        name: category.name,
      },
    });
  }

  async getAllCategory() {
    return prisma.category.findMany();
  }

  async getCategoryById(id: number) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        _count: { select: { products: true } },
      },
    });
  }
}
