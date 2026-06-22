import { body } from "express-validator";

export const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Название категории обязательно")
    .isLength({ min: 2, max: 100 })
    .withMessage("Название должно быть от 2 до 100 символов"),

  body("slug")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Ссылка не может быть пустой"),
];
