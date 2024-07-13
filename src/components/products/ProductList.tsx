"use client";
import { Box, IconButton, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "@/common/types/product.types";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ProductType } from "@enums/product.enums";
import ProductForm from "../forms/products/ProductForm";
import { deleteOneProduct } from "@/services/products.service";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    console.log("selected product:", selectedProduct);
  });

  const handleAddClick = () => {
    setSelectedProduct({
      name: "",
      type: ProductType.Phone,
      price: 0,
      rating: 0,
      warranty_years: 0,
      available: false,
    });
  };

  const handleDelete = async () => {
    await deleteOneProduct(selectedProduct!._id!);
    setSelectedProduct(null);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSave = () => {
    setSelectedProduct(null);
  };

  return (
    <Box>
      <Box className="border-b border-divider mb-10 border-white flex justify-between ">
        <Typography variant="h4" component="h1">
          Product List
        </Typography>
        <Typography>authed as : {user?.email}</Typography>
      </Box>
      <Box className="flex gap-4 items-center">
        {products.length === 0 ? (
          <Typography fontWeight="light" component="p">
            There is currently no product. Add your first one :
          </Typography>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))
        )}
        {selectedProduct && (
          <ProductForm
            product={selectedProduct}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
        <Box>
          <IconButton
            size="large"
            className="bg-slate-400 hover:bg-slate-300"
            onClick={handleAddClick}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductList;
