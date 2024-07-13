import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../db/db-connection";
import Product, { IProduct } from "../../db/models/product.model";
import { ObjectId } from "mongodb";

export async function PATCH(request: NextRequest) {
  try {
    console.log("Request received");

    const data = await request.json();
    const { _id, name, type, price, rating, warranty_years, available } = data;
    console.log("Request JSON parsed:", data);

    if (!_id) {
      console.log("Product ID is required");
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    console.log("Validation passed");

    await dbConnect();

    // fucking trash mongodb
    const product = await Product.findById(new ObjectId(_id));
    if (!product) {
      console.log("Product not found");
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    if (name !== undefined) product.name = name;
    if (type !== undefined) product.type = type;
    if (price !== undefined) product.price = Number(price);
    if (rating !== undefined) product.rating = Number(rating);
    if (warranty_years !== undefined)
      product.warranty_years = Number(warranty_years);
    if (available !== undefined) product.available = Boolean(available);

    await product.save();
    console.log("Product updated:", product);

    return NextResponse.json(
      { message: "Product updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
