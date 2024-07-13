import { CreateProductData } from "@/common/interfaces/create-product.interface";
import { UpdateProductData } from "@/common/interfaces/update-product.interface";
import { Product } from "@/common/types/product.types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const products: Product[] = await response.json();
    return products;
  } else {
    console.error("Error fetching products");
    return [];
  }
};
export const createProduct = async (data: CreateProductData) => {
  const response = await fetch("/api/products/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("Product created successfully");
  } else {
    console.error("Error creating product");
  }

  return response;
};

export const updateProduct = async (data: UpdateProductData) => {
  const response = await fetch("/api/products/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("Product updated successfully");
  } else {
    console.error("Error updating product");
  }

  return response;
};

export const deleteProduct = async (_id: string) => {
  const response = await fetch(`/api/products/delete/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("Product deleted successfully");
  } else {
    console.error("Error deleting product");
  }

  return response;
};
