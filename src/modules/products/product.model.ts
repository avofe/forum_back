export interface IProduct {
  name: string;
  brand: string;
  model: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId: number;
}

export interface IProductUpDate {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface IFilter {
  categoryId?: number;
  brand?: string[];
  stock?: string[];
  minValue?: number;
  maxValue?: number;
}
