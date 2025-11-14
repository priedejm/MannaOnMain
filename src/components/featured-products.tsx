import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ProductCard } from "./product-card";
import { products } from "../data/products";

export const FeaturedProducts: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Most Popular</h2>
          <div className="flex space-x-2">
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onPress={scrollLeft}
              aria-label="Scroll left"
            >
              <Icon icon="lucide:chevron-left" width={20} />
            </Button>
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onPress={scrollRight}
              aria-label="Scroll right"
            >
              <Icon icon="lucide:chevron-right" width={20} />
            </Button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">Explore our wide selection today</p>
        
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hidden pb-4"
        >
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="min-w-[220px] max-w-[220px]">
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                inStock={product.inStock}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};