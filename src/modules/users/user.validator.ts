import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Имя обязательно")
    .isLength({ min: 2, max: 50 })
    .withMessage("Имя должно быть от 2 до 50 символов")
    .matches(/^[a-zA-Zа-яА-Я\s]+$/)
    .withMessage("Имя может содержать только буквы"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Телефон обязателен")
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage("Неверный формат телефона"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Неверный формат email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Пароль обязателен")
    .isLength({ min: 6 })
    .withMessage("Пароль должен быть минимум 6 символов"),
];

export const validateLogin = [
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Телефон обязателен")
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage("Неверный формат телефона"),

  body("password").notEmpty().withMessage("Пароль обязателен"),
];

export const validateEdit = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Имя обязательно")
    .isLength({ min: 2, max: 50 })
    .withMessage("Имя должно быть от 2 до 50 символов")
    .matches(/^[a-zA-Zа-яА-Я\s]+$/)
    .withMessage("Имя может содержать только буквы"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Телефон обязателен")
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage("Неверный формат телефона"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Неверный формат email")
    .normalizeEmail(),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Ошибка валидации",
      errors: errors.array().map((err) => ({
        field: err.type === "field" ? err.path : err.type,
        message: err.msg,
      })),
    });
  }
  next();
};
