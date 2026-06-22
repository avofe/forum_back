import { Request, Response } from "express";
import { UserService } from "./user.service";
import { IRequestAuth } from "./user.model";
import { Prisma } from "@prisma/client";

const service = new UserService();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 2 * 24 * 60 * 60 * 1000,
};

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body;

      if (!name || !password || !phone) {
        return res.status(400).json({ message: "Все поля обязательны" });
      }

      const data = await service.createUser({ name, email, password, phone });

      res.cookie("jwt", data.token, COOKIE_OPTIONS);
      res.status(201).json(data);
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const target = (err.meta?.target as string[]) ?? [];
        const field = target.includes("phone")
          ? "телефон"
          : target.includes("email")
            ? "email"
            : "данные";
        return res.status(409).json({
          message: `Пользователь с таким ${field} уже зарегистрирован`,
        });
      }

      res.status(500).json({
        message: "Ошибка при создании пользователя",
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

      res.cookie("jwt", data.token, COOKIE_OPTIONS);
      res.json(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(401).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async logoutUser(_req: Request, res: Response) {
    res.clearCookie("jwt", { path: "/" });
    res.json({ message: "Выход выполнен" });
  }

  async quickLogin(req: IRequestAuth, res: Response) {
    try {
      const user = req.user;

      if (!user || !user.id) {
        return res
          .status(401)
          .json({ message: "Требуется авторизация" });
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

  async editAccount(req: IRequestAuth, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Требуется авторизация" });
      }

      const targetId = Number(id);
      const isAdmin = req.user.role === "admin";
      const isSelf = req.user.id === targetId;

      if (!isSelf && !isAdmin) {
        return res.status(403).json({ message: "Недостаточно прав" });
      }

      const allowed: Record<string, unknown> = {};
      if (data.name !== undefined) allowed.name = data.name;
      if (data.email !== undefined) allowed.email = data.email;
      if (data.phone !== undefined) allowed.phone = data.phone;
      if (data.password !== undefined) allowed.password = data.password;

      const user = await service.editAccount(targetId, allowed);

      res.json(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await service.deleteUser(Number(id));

      res.json({ message: "Пользователь удален" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  }
}
