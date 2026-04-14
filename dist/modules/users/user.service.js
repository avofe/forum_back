"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../config/db"));
const jwt_1 = require("../../utils/jwt");
class UserService {
    async createUser(data) {
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await db_1.default.user.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: hashedPassword,
            },
        });
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            phone: user.phone,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                role: user.role,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            token,
        };
    }
    async loginUser(data) {
        const user = await db_1.default.user.findUnique({ where: { phone: data.phone } });
        if (!user)
            throw new Error("Пользователь не найден");
        const isValid = await bcrypt_1.default.compare(data.password, user.password);
        if (!isValid)
            throw new Error("Неверный пароль");
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            phone: user.phone,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                role: user.role,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            token,
        };
    }
    async quickLogin(id) {
        const user = await db_1.default.user.findUnique({ where: { id } });
        if (!user)
            throw new Error("Пользователь не найден");
        return {
            user: {
                id: user.id,
                role: user.role,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        };
    }
    async getAllUsers() {
        const [users, count] = await db_1.default.$transaction([
            db_1.default.user.findMany({
                select: { id: true, name: true, email: true, phone: true },
                orderBy: { id: "desc" },
            }),
            db_1.default.user.count(),
        ]);
        return {
            count,
            users,
        };
    }
    async editAccount(id, data) {
        const user = await db_1.default.user.update({
            where: { id },
            data,
        });
        return { user };
    }
    async deleteUser(id) {
        await db_1.default.user.delete({ where: { id } });
    }
}
exports.UserService = UserService;
