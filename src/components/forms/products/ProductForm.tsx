import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

import { Product } from "@/common/types/product.types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createProduct, updateProduct } from "@/app/api/products/products.req";
import CustomInput from "@/components/input/CustomInput";
import { CreateProductData } from "@/common/interfaces/create-product.interface";
import CustomSelect from "@/components/select/CustomSelect";
import { ProductType } from "@enums/product.enums";
import CustomNumberPicker from "@/components/number-picker/CustomNumberPicker";
import {
  createNewProduct,
  updateOneProduct,
} from "@/services/products.service";

const ProductForm: React.FC<{
  product: Product;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
}> = ({ product, onClose, onSave, onDelete }) => {
  const { control, handleSubmit } = useForm<CreateProductData>({
    defaultValues: product || {},
  });

  const onSubmit: SubmitHandler<CreateProductData> = async (data) => {
    console.log("product in submit: ", data);
    data.rating = Number(data.rating);
    if (!data._id) {
      onSave();
      console.log("should not log this");
      return await createNewProduct(data);
    }
    onSave();
    console.log("product to update: ", data);
    return await updateOneProduct(data);
  };

  const productNameController = {
    name: "name",
    control: control,
  };

  const productTypeController = {
    name: "type",
    control: control,
  };

  const productPriceController = {
    name: "price",
    control: control,
  };

  const productRatingController = {
    name: "rating",
    control: control,
  };

  const productWarrantyController = {
    name: "warranty_years",
    control: control,
  };

  const productTypeOptions = Object.keys(ProductType).map((key) => ({
    value: ProductType[key as keyof typeof ProductType],
    label: key,
  }));

  const productRatingOptions = [1, 2, 3, 4, 5].map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

  return (
    <Dialog open={true} onClose={onClose} className="p-4">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <CustomInput
          controller={productNameController}
          placeholder="Enter product name..."
        />
        <CustomSelect
          controller={productTypeController}
          placeholder="Select product type..."
          options={productTypeOptions}
        />
        <CustomNumberPicker
          controller={productPriceController}
          placeholder="Enter product price..."
        />
        <CustomSelect
          controller={productRatingController}
          placeholder="Enter product rating..."
          options={productRatingOptions}
        />
        <CustomNumberPicker
          controller={productWarrantyController}
          placeholder="Enter product warranty..."
        />
        <Controller
          name="available"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Available"
            />
          )}
        />
      </DialogContent>
      <DialogActions className="flex justify-between">
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
        <Box>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
