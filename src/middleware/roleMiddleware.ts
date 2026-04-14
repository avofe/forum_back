import { Request, Response, NextFunction } from "express";
import { IRequestAuth } from "../modules/users/user.model";

export const roleMiddleware = (roles: string[]) => {
  return (req: IRequestAuth, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    next();
  };
};
