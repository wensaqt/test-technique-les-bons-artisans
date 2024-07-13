import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../db/db-connection";
import Product, { IProduct } from "../../../db/models/product.model";
import { ObjectId } from "mongodb";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log("Request to delete product with ID:", id);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const product = await Product.findByIdAndDelete(new ObjectId(id));
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    console.log("Product deleted:", product);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
