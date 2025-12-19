import { Request, Response } from "express";
import { RepairService } from "./repair.service";
import { IAdmin, IRequestAuth, IUser, IUserAuth } from "../users/user.model";

const service = new RepairService();

export class RepairController {
  async createRepair(req: Request, res: Response) {
    const data = await service.createRepair(req.body);
    res.json(data);
  }

  async getAllRepair(req: IAdmin, res: Response) {
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async getAllRepairUser(req: Request, res: Response) {
    const userId = Number(req.headers.user);
    const data = await service.getAllRepairUser(userId);
    res.json(data);
  }

  async getRepairById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.getRepairById(id);
    res.json(data);
  }

  async filterRepair(req: Request, res: Response) {
    const filter = req.body;
    const data = await service.filterRepair(filter);
    res.json(data);
  }

  async editStatus(req: Request, res: Response) {
    const status = req.body.status;
    const id = Number(req.params.id);
    const data = await service.editStatus(id, status);

    res.json(data);
  }
}
