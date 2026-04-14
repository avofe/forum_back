"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairController = void 0;
const repair_service_1 = require("./repair.service");
const service = new repair_service_1.RepairService();
class RepairController {
    async createRepair(req, res) {
        const data = await service.createRepair(req.body);
        res.json(data);
    }
    async getAllRepair(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res
                    .status(401)
                    .json({ message: `Требуется авторизация ${req}` });
            }
            if (user.role === "user") {
                return res.status(401).json({ message: `Доступ запрещен` });
            }
            const data = await service.getAllRepair();
            res.json(data);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(404).json({ message: err.message });
            }
            else {
                res.status(500).json({ message: "Неизвестная ошибка" });
            }
        }
    }
    async getAllRepairUser(req, res) {
        const userId = Number(req.headers.user);
        const data = await service.getAllRepairUser(userId);
        res.json(data);
    }
    async getRepairById(req, res) {
        const id = Number(req.params.id);
        const data = await service.getRepairById(id);
        res.json(data);
    }
    async filterRepair(req, res) {
        const filter = req.body;
        const data = await service.filterRepair(filter);
        res.json(data);
    }
    async editStatus(req, res) {
        const status = req.body.status;
        const id = Number(req.params.id);
        const data = await service.editStatus(id, status);
        res.json(data);
    }
    async deleteRepair(req, res) {
        const id = Number(req.params.id);
        await service.deleteRepair(id);
        res.json({ message: "Deleted" });
    }
}
exports.RepairController = RepairController;
