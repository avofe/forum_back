"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const date_fns_1 = require("date-fns");
class RepairService {
    async createRepair(data) {
        return db_1.default.repairRequest.create({
            data: {
                userId: data.userId,
                cause: data.cause,
                comment: data.comment,
            },
        });
    }
    async getAllRepair() {
        const repairs = await db_1.default.repairRequest.findMany({
            where: {
                status: { not: "archive" },
            },
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
            orderBy: {
                created_at: "desc",
            },
        });
        const count = await db_1.default.repairRequest.count();
        return { count, repairs };
    }
    async getAllRepairUser(userId) {
        return db_1.default.repairRequest.findMany({
            where: { userId },
            orderBy: { created_at: "desc" },
        });
    }
    async getRepairById(id) {
        return db_1.default.repairRequest.findUnique({
            where: { id },
        });
    }
    async filterRepair(filter) {
        const where = {};
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
                gte: (0, date_fns_1.startOfDay)(parsedDate),
                lte: (0, date_fns_1.endOfDay)(parsedDate),
            };
        }
        if (filter.cause) {
            where.cause = { contains: filter.cause, mode: "insensitive" };
        }
        if (filter.comment) {
            where.comment = { contains: filter.comment, mode: "insensitive" };
        }
        const repairs = await db_1.default.repairRequest.findMany({
            where,
            include: { user: { select: { email: true, name: true, phone: true } } },
            orderBy: { created_at: "desc" },
        });
        return repairs;
    }
    async editStatus(id, status) {
        const repair = await db_1.default.repairRequest.findUnique({ where: { id } });
        if (!repair) {
            throw new Error(`Заявка с ID ${id} не найдена.`);
        }
        return db_1.default.repairRequest.update({
            where: { id },
            data: { status },
            include: { user: true },
        });
    }
    async deleteRepair(id) {
        return db_1.default.repairRequest.delete({ where: { id } });
    }
}
exports.RepairService = RepairService;
