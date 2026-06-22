import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Ошибка валидации",
      errors: errors.array().map((err) => {
        if (err.type === "field") {
          return { field: err.path, message: err.msg };
        }
        return { field: "unknown", message: err.msg };
      }),
    });
  }
  next();
};
