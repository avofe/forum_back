"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const service = new user_service_1.UserService();
class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password, phone } = req.body;
            if (!name || !password || !phone) {
                return res.status(400).json({ message: "Все поля обязательны" });
            }
            const data = await service.createUser({ name, email, password, phone });
            res.status(201).json(data);
        }
        catch (err) {
            res.status(500).json({
                message: "Ошибка при создании пользователя",
                error: err.message,
            });
        }
    }
    async loginUser(req, res) {
        try {
            const { phone, password } = req.body;
            if (!password || !phone) {
                return res.status(400).json({ message: "Все поля обязательны" });
            }
            const data = await service.loginUser({ phone, password });
            res.json(data);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(401).json({ message: err.message });
            }
            else {
                res.status(500).json({ message: "Неизвестная ошибка" });
            }
        }
    }
    async quickLogin(req, res) {
        try {
            const user = req.user;
            if (!user || !user.id) {
                return res
                    .status(401)
                    .json({ message: `Требуется авторизация ${req}` });
            }
            const data = await service.quickLogin(user.id);
            res.json(data);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(404).json({ message: err.message });
            }
            else {
                res.status(500).json({ message: "Неизвестная ошибка" });
            }
        }
    }
    async getAllUsers(req, res) {
        try {
            const data = await service.getAllUsers();
            res.json(data);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.status(500).json({ message: "Неизвестная ошибка" });
            }
        }
    }
    async editAccount(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const user = await service.editAccount(Number(id), data);
            res.json(user);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.status(500).json({ message: "Неизвестная ошибка" });
            }
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await service.deleteUser(Number(id));
            res.json({ message: "Пользователь удален" });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
            else {
                res.status(500).json({ message: "Неизвестная ошибка" });
            }
        }
    }
}
exports.UserController = UserController;
