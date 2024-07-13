import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../db/db-connection";
import Product, { IProduct } from "../../db/models/product.model";

export async function POST(request: NextRequest) {
  try {
    console.log("Request received");

    const data = await request.json();
    console.log("Request JSON parsed:", data);

    const { name, type, price, rating, warranty_years, available } = data;
    console.log(
      "Parsed fields - name:",
      name,
      "type:",
      type,
      "price:",
      price,
      "rating:",
      rating,
      "warranty_years:",
      warranty_years,
      "available:",
      available
    );

    if (
      !name ||
      !type ||
      price === undefined ||
      rating === undefined ||
      warranty_years === undefined ||
      available === undefined
    ) {
      console.log("Validation failed");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Validation passed");

    await dbConnect();
    console.log("Database connected");

    const newProduct = new Product({
      name,
      type,
      price: Number(price),
      rating: Number(rating),
      warranty_years: Number(warranty_years),
      available: Boolean(available),
    });

    await newProduct.save();
    console.log("Product saved:", newProduct);

    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
