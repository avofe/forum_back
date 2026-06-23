import { body } from "express-validator";

export const validateRepair = [
  body("cause")
    .trim()
    .notEmpty()
    .withMessage("Причина обращения обязательна"),

  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Описание обязательно")
    .isLength({ max: 2000 })
    .withMessage("Описание не должно превышать 2000 символов"),

  body("userId")
    .notEmpty()
    .withMessage("ID пользователя обязателен")
    .isInt()
    .withMessage("ID пользователя должен быть числом"),
];
