import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: "Слишком много попыток. Попробуйте через минуту." },
  standardHeaders: true,
  legacyHeaders: false,
});
