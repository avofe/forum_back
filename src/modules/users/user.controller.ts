import { Request, Response } from "express";
import { UserService } from "./user.service";
import { IRequestAuth } from "./user.model";

const service = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body;

      if (!name || !password || !phone) {
        return res.status(400).json({ message: "Все поля обязательны" });
      }

      const data = await service.createUser({ name, email, password, phone });

      res.status(201).json(data);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({
        message: "Ошибка при создании пользователя",
        error: err.message,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { phone, password } = req.body;

      if (!password || !phone) {
        return res.status(400).json({ message: "Все поля обязательны" });
      }

      const data = await service.loginUser({ phone, password });

      res.json(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(401).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async quickLogin(req: IRequestAuth, res: Response) {
    try {
      const user = req.user;

      if (!user || !user.id) {
        return res
          .status(401)
          .json({ message: `Требуется авторизация ${req}` });
      }

      const data = await service.quickLogin(user.id);

      res.json(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const data = await service.getAllUsers();

      res.json(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }
}
