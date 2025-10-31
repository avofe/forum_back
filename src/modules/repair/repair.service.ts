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
    return prisma.repairRequest.findMany();
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
    const { status, date, id } = filter;

    const where: any = {};

    if (status !== undefined) {
      where.status = status;
    }

    if (date !== undefined) {
      const parsDate = new Date(date);
      where.created_at = {
        gte: startOfDay(parsDate),
        lte: endOfDay(parsDate),
      };
    }

    if (id !== undefined) {
      where.id = Number(id);
    }

    const repairs = await prisma.repairRequest.findMany({ where });

    return repairs;
  }
}
