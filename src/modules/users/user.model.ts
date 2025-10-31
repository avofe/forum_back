import { Request } from "express";

export interface IUser {
  phone: string;
  email?: string;
  role?: "admin" | "user";
  name: string;
  password: string;
}
export interface IUserLogin {
  role?: "admin" | "user";
  phone: string;
  password: string;
}

export interface IUserAuth {
  role: "admin" | "user";
  id: number;
  number: string;
}

export interface IRequestAuth extends Request {
  user?: IUserAuth;
}

export interface IAdmin extends Request {
  user?: IUser;
}
