"use client";
import ProductList from "@/components/products/ProductList";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchProducts } from "@/services/products.service";

export default function Home() {
  const products = useSelector((state: RootState) => state.products.products);
  useEffect(() => {
    fetchProducts();
  }, []);

  return <ProductList products={products} />;
}
