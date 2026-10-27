# Forum Server

Серверная часть веб-сервиса (интернет-магазин/форум-платформа).  
Реализована на **Node.js + Express + TypeScript + Prisma + PostgreSQL**.

## Стек

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) для аутентификации
- [Zod](https://zod.dev/) для валидации
- [Multer](https://github.com/expressjs/multer) для загрузки файлов
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) для хеширования паролей

## Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/avofe/forum_back.git
cd forum_back

# Установить зависимости
npm install

# Настроить переменные окружения
cp .env.example .env
# Отредактируйте .env под свои настройки

# Миграции Prisma
npx prisma migrate dev

# Генерация клиента Prisma
npx prisma generate

# Запуск в dev-режиме
npm run dev

# Сборка
npm run build

# Запуск в prod-режиме
npm start

# Сидирование БД
npm run seed
```

## Переменные окружения

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

Переменные:
- `DATABASE_URL` — строка подключения к PostgreSQL
- `PORT` — порт сервера (по умолчанию 5000)
- `JWT_SECRET` — секретный ключ для JWT
- `CORS_ORIGIN` — разрешенный origin для CORS

## Структура проекта

```text
forum_back/
├── prisma/        # Схема и миграции Prisma
├── src/
│   ├── config/    # Конфигурация (БД и др.)
│   ├── middleware/# Middleware (auth, validation, errors)
│   ├── modules/   # Модули (users, products, categories, orders, repair)
│   ├── utils/     # Утилиты (jwt и др.)
│   ├── app.ts     # Настройка Express
│   └── server.ts  # Точка входа
├── uploads/       # Загруженные файлы
├── dist/          # Сборка
└── package.json
```

## API

Основные модули:
- `auth/users` — авторизация/регистрация, пользователи
- `products` — товары, поиск, фильтрация
- `categories` — категории
- `cart` — корзина
- `orders` — заказы
- `repair` — заявки на ремонт
- `reviews` — отзывы

Статические файлы доступны по `/uploads/...`.

## Автор

- GitHub: [avofe](https://github.com/avofe)
