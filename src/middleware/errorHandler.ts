import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[${new Date().toISOString()}] ${err.message}`);

  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "Внутренняя ошибка сервера" });
};
