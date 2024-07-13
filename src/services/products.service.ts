import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/app/api/products/products.req";
import { CreateProductData } from "@/common/interfaces/create-product.interface";
import { UpdateProductData } from "@/common/interfaces/update-product.interface";
import { setProducts } from "@/store/products-slice";
import { dispatch } from "@/store/store";

export const fetchProducts = async () => {
  const products = await getProducts();
  dispatch(setProducts(products));
};

export const createNewProduct = async (product: CreateProductData) => {
  const response = await createProduct(product);
  if (response.ok) return fetchProducts();
};

export const updateOneProduct = async (product: UpdateProductData) => {
  const response = await updateProduct(product);
  if (response.ok) return fetchProducts();
};

export const deleteOneProduct = async (_id: string) => {
  const response = await deleteProduct(_id);
  if (response.ok) return fetchProducts();
};
