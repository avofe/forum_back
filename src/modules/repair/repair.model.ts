import { Request } from "express";

export interface IRepair {
  userId: number;
  cause: string;
  comment: string;
}

export interface IFilter {
  status: "fulfilled" | "pending" | undefined;
  date: string | undefined;
  id: number | undefined;
}
