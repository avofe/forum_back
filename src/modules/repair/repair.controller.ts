import { Request, Response } from "express";
import { RepairService } from "./repair.service";
import { IAdmin, IRequestAuth, IUser, IUserAuth } from "../users/user.model";

const service = new RepairService();

export class RepairController {
  async createRepair(req: Request, res: Response) {
    try {
      const data = await service.createRepair(req.body);
      res.status(201).json(data);
    } catch {
      res.status(500).json({ message: "Ошибка при создании заявки" });
    }
  }

  async getAllRepair(req: IAdmin, res: Response) {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Требуется авторизация" });
      }
      if (user.role === "user") {
        return res.status(403).json({ message: "Доступ запрещен" });
      }

      const data = await service.getAllRepair();

      res.json(data);
    } catch {
      res.status(500).json({ message: "Ошибка при получении заявок" });
    }
  }

  async getAllRepairUser(req: IRequestAuth, res: Response) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Требуется авторизация" });
      }
      const data = await service.getAllRepairUser(req.user.id);
      res.json(data);
    } catch {
      res.status(500).json({ message: "Ошибка при получении заявок" });
    }
  }

  async getRepairById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await service.getRepairById(id);
      if (!data) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }
      res.json(data);
    } catch {
      res.status(500).json({ message: "Ошибка при получении заявки" });
    }
  }

  async filterRepair(req: Request, res: Response) {
    try {
      const filter = req.body;
      const data = await service.filterRepair(filter);
      res.json(data);
    } catch {
      res.status(500).json({ message: "Ошибка фильтрации" });
    }
  }

  async editStatus(req: Request, res: Response) {
    try {
      const status = req.body.status;
      const id = Number(req.params.id);
      const data = await service.editStatus(id, status);
      res.json(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("не найдена")) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }
      res.status(500).json({ message: "Ошибка при обновлении статуса" });
    }
  }

  async deleteRepair(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.deleteRepair(id);
      res.json({ message: "Deleted" });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("RecordNotFound")) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }
      res.status(500).json({ message: "Ошибка при удалении заявки" });
    }
  }
}
