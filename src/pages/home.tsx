import React from "react";
import { Hero } from "../components/hero";
import { FeaturedProducts } from "../components/featured-products";
import { CategoriesGrid } from "../components/categories-grid";
import { Testimonials } from "../components/testimonials";
import { StoreInfo } from "../components/store-info";

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoriesGrid />
      <Testimonials />
      <StoreInfo />
    </div>
  );
};