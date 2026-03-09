import { NextFunction, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { IRequestAuth, IUserAuth } from "../modules/users/user.model";

export const authMiddleware = (
  req: IRequestAuth,
  res: Response,
  next: NextFunction,
) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "JWT секрет не настроен на сервере" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Требуется авторизация" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as IUserAuth;
    req.user = decoded;

    return next();
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Токен истёк" });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ message: "Недействительный токен" });
    }
    console.error("authMiddleware error:", error);
    return res.status(500).json({ message: "Ошибка аутентификации" });
  }
};
