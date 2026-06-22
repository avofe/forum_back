import prisma from "../../config/db";
import { ICategory } from "./category.model";

export class CategoryService {
  async createCategory(category: ICategory) {
    return prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
      },
    });
  }

  async getAllCategory() {
    return prisma.category.findMany();
  }

  async getAllWithCount() {
    const category = await prisma.category.findMany();
    const count = await prisma.category.count();

    return { category, count };
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

  async updateCategory(id: number, data: Partial<ICategory>) {
    return prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: number) {
    return prisma.category.delete({ where: { id } });
  }
}
