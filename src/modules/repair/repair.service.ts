import prisma from "../../config/db";
import { IFilter, IRepair } from "./repair.model";
import { startOfDay, endOfDay } from "date-fns";

export class RepairService {
  async createRepair(data: IRepair) {
    return prisma.repairRequest.create({
      data: {
        userId: data.userId,
        cause: data.cause,
        comment: data.comment,
      },
    });
  }

  async getAllRepair() {
    const repairs = await prisma.repairRequest.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
            phone: true,
            repairs: true,
          },
        },
      },
    });

    const count = await prisma.repairRequest.count();

    return { count, repairs };
  }

  async getAllRepairUser(userId: number) {
    return prisma.repairRequest.findMany({ where: { userId } });
  }

  async getRepairById(id: number) {
    return prisma.repairRequest.findUnique({
      where: { id },
    });
  }

  async filterRepair(filter: IFilter) {
    const where: any = {};

    if (filter.id !== undefined) {
      where.id = Number(filter.id);
    }

    if (filter.userId !== undefined) {
      where.userId = Number(filter.userId);
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.date) {
      const parsedDate = new Date(filter.date);
      where.created_at = {
        gte: startOfDay(parsedDate),
        lte: endOfDay(parsedDate),
      };
    }

    if (filter.cause) {
      where.cause = { contains: filter.cause, mode: "insensitive" };
    }

    if (filter.comment) {
      where.comment = { contains: filter.comment, mode: "insensitive" };
    }

    const repairs = await prisma.repairRequest.findMany({
      where,
      include: { user: { select: { email: true, name: true, phone: true } } },
      orderBy: { created_at: "desc" },
    });

    return repairs;
  }

  async editStatus(id: number, status: "string") {
    const repair = await prisma.repairRequest.findUnique({ where: { id } });

    if (!repair) {
      throw new Error(`Заявка с ID ${id} не найдена.`);
    }

    return prisma.repairRequest.update({
      where: { id },
      data: { status },
      include: { user: true },
    });
  }
}
