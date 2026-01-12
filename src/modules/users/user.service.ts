import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/db";
import { IUser, IUserLogin } from "./user.model";
import { generateToken } from "../../utils/jwt";

export class UserService {
  async createUser(data: IUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: hashedPassword,
      },
    });

    const token = generateToken({
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

  async loginUser(data: IUserLogin) {
    const user = await prisma.user.findUnique({ where: { phone: data.phone } });

    if (!user) throw new Error("Пользователь не найдены");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Неверный пароль");

    const token = generateToken({
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

  async quickLogin(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new Error("Пользователь не найден");

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
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        select: { id: true, name: true, email: true, phone: true },
        orderBy: { id: "desc" },
      }),
      prisma.user.count(),
    ]);

    return {
      count,
      users,
    };
  }

  async editAccount(id: number, data: Partial<IUser>) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return { user };
  }
}
