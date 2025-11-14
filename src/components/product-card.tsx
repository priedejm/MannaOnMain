import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCart } from "../contexts/cart-context";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  inStock?: boolean;
  stockLevel?: "high" | "low" | "out"; // Added stockLevel prop
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  inStock = true,
  stockLevel = "high" // Default to high stock
}) => {
  const { addItem } = useCart();
  
  return (
    <Card 
      className="product-card overflow-hidden"
      isPressable
      as={Link}
      to={`/product/${id}`}
    >
      <CardBody className="p-0 overflow-hidden">
        <div className="aspect-[1/1.2] relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-primary px-3 py-1 rounded-md text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Stock indicator badges */}
          {inStock && stockLevel === "low" && (
            <div className="absolute top-2 right-2">
              <span className="bg-warning text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
                Low Stock
              </span>
            </div>
          )}
          
          {!inStock && (
            <div className="absolute top-2 right-2">
              <span className="bg-danger text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="text-sm font-medium line-clamp-2 mb-1">{title}</h3>
        <div className="flex justify-between items-center w-full">
          <span className="text-primary font-semibold">${price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            {/* Show stock indicator text for low stock */}
            {inStock && stockLevel === "low" && (
              <span className="text-warning text-xs">Low Stock</span>
            )}
            
            {inStock && (
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="flat"
                className="ml-auto"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem(id, 1);
                }}
              >
                <Icon icon="lucide:shopping-bag" width={16} />
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};