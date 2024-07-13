import { ProductType } from "@enums/product.enums";
export type Product = {
  _id?: string;
  name: string;
  type: ProductType;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
};
