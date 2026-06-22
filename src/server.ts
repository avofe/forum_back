import dotenv from "dotenv";
import app from "./app";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET не задан в переменных окружения");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL не задана в переменных окружения");
  process.exit(1);
}

const PORT = Number(process.env.PORT) || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`\n${signal} получен. Завершение работы...`);
  server.close(() => {
    console.log("Сервер остановлен");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
