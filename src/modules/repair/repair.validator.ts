import { body } from "express-validator";

export const validateRepair = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Имя обязательно")
    .isLength({ min: 2, max: 100 })
    .withMessage("Имя должно быть от 2 до 100 символов"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Телефон обязателен"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Описание не должно превышать 2000 символов"),
];
