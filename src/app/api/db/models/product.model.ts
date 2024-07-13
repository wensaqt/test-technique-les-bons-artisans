// db/models/product.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { ProductType } from "@enums/product.enums";

export interface IProduct extends Document {
  name: string;
  type: ProductType;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ProductType, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  warranty_years: { type: Number, required: true },
  available: { type: Boolean, required: true },
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
