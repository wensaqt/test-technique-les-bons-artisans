import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "@/common/types/product.types";
import { getProducts as fetchProducts } from "@/app/api/products/products.req";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
