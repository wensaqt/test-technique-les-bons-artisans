import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import type { Product } from "@/common/types/product.types";
import StarIcon from "@mui/icons-material/Star";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card sx={{ width: 250 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {product.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating}{" "}
            <StarIcon sx={{ fontSize: 16, verticalAlign: "bottom" }} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Warranty: {product.warranty_years} years
          </Typography>
          <Typography
            variant="body2"
            color={product.available ? "green" : "red"}
          >
            {product.available ? "Available" : "Not Available"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
