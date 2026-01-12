export interface IRepair {
  userId: number;
  cause: string;
  comment: string;
}

export interface IFilter {
  status?: "fulfilled" | "pending";
  date?: string;
  id?: number;
  userId?: number;
  cause?: string;
  comment?: string;
  created_at?: Date;
}
