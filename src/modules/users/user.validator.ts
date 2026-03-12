import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  maxLength: 50,
};

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    return "+7" + digits.slice(1);
  } else if (digits.startsWith("7")) {
    return "+7" + digits.slice(1);
  } else if (digits.startsWith("9")) {
    return "+7" + digits;
  }

  if (phone.startsWith("+")) {
    const withoutPlus = digits;
    if (withoutPlus.startsWith("7")) {
      return "+" + withoutPlus;
    }
  }

  return "+7" + digits;
}

function validatePhone(phone: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
  const formatted = formatPhoneNumber(phone);
  const digits = formatted.replace(/\D/g, "");

  if (digits.length !== 11) {
    return {
      isValid: false,
      formatted,
      error: "Телефон должен содержать 10 цифр после кода страны",
    };
  }

  const validPrefixes = ["9", "4", "8"];
  const secondDigit = digits[1];
  if (!validPrefixes.includes(secondDigit)) {
    return {
      isValid: false,
      formatted,
      error: "Неверный формат российского номера",
    };
  }

  return { isValid: true, formatted };
}

const validatePassword = (value: string) => {
  if (!value) {
    throw new Error("Пароль обязателен");
  }

  if (value.length < PASSWORD_REQUIREMENTS.minLength) {
    throw new Error(
      `Пароль должен быть минимум ${PASSWORD_REQUIREMENTS.minLength} символов`,
    );
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(value)) {
    throw new Error("Пароль должен содержать хотя бы одну заглавную букву");
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(value)) {
    throw new Error("Пароль должен содержать хотя бы одну строчную букву");
  }

  if (PASSWORD_REQUIREMENTS.requireNumbers && !/[0-9]/.test(value)) {
    throw new Error("Пароль должен содержать хотя бы одну цифру");
  }

  if (value.length > PASSWORD_REQUIREMENTS.maxLength) {
    throw new Error(
      `Пароль не должен превышать ${PASSWORD_REQUIREMENTS.maxLength} символов`,
    );
  }

  return true;
};

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Имя обязательно")
    .isLength({ min: 2, max: 50 })
    .withMessage("Имя должно содержать от 2 до 50 символов")
    .matches(/^[a-zA-Zа-яА-Я\s-]+$/)
    .withMessage("Имя может содержать только буквы, пробелы и дефис"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Телефон обязателен")
    .customSanitizer((value) => {
      const { formatted } = validatePhone(value);
      return formatted;
    })
    .custom((value) => {
      const { isValid, error } = validatePhone(value);
      if (!isValid) {
        throw new Error(error || "Неверный формат телефона");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("Email обязателен")
    .isEmail()
    .withMessage("Неверный формат email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Пароль обязателен")
    .custom(validatePassword),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Подтверждение пароля обязательно")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли не совпадают");
      }
      return true;
    }),
];

export const validateLogin = [
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Телефон обязателен")
    .customSanitizer((value) => {
      const { formatted } = validatePhone(value);
      return formatted;
    })
    .custom((value) => {
      const { isValid, error } = validatePhone(value);
      if (!isValid) {
        throw new Error(error || "Неверный формат телефона");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Пароль обязателен")
    .custom(validatePassword),
];

export const validateEdit = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Имя обязательно")
    .isLength({ min: 2, max: 50 })
    .withMessage("Имя должно содержать от 2 до 50 символов")
    .matches(/^[a-zA-Zа-яА-Я\s-]+$/)
    .withMessage("Имя может содержать только буквы, пробелы и дефис"),

  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Телефон обязателен")
    .customSanitizer((value) => {
      const { formatted } = validatePhone(value);
      return formatted;
    })
    .custom((value) => {
      const { isValid, error } = validatePhone(value);
      if (!isValid) {
        throw new Error(error || "Неверный формат телефона");
      }
      return true;
    }),

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
    const formattedErrors = errors.array().map((err) => {
      if (err.type === "field") {
        return {
          field: err.path,
          message: err.msg,
        };
      }
      return {
        field: "unknown",
        message: err.msg,
      };
    });

    return res.status(400).json({
      message: "Ошибка валидации",
      errors: formattedErrors,
    });
  }
  next();
};
