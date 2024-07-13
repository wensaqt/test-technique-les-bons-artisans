import { NextResponse } from "next/server";
import dbConnect from "../db/db-connection";
import Product, { IProduct } from "../db/models/product.model";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
