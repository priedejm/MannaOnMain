import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@heroui/react";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, link }) => {
  return (
    <Card 
      isPressable
      as={Link}
      to={link}
      className="overflow-hidden product-card"
    >
      <CardBody className="p-0 relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white text-xl font-medium p-6">{title}</h3>
        </div>
      </CardBody>
    </Card>
  );
};

export const CategoriesGrid: React.FC = () => {
  const categories = [
    { title: "Bibles", imageUrl: "https://img.heroui.chat/image/book?w=400&h=400&u=1", link: "/shop?category=bibles" },
    { title: "Books", imageUrl: "https://img.heroui.chat/image/book?w=400&h=400&u=2", link: "/shop?category=books" },
    { title: "Children", imageUrl: "https://img.heroui.chat/image/book?w=400&h=400&u=3", link: "/shop?category=children" },
    { title: "Gifts", imageUrl: "https://img.heroui.chat/image/book?w=400&h=400&u=4", link: "/shop?category=gifts" },
    { title: "Home & Outdoor", imageUrl: "https://img.heroui.chat/image/book?w=400&h=400&u=5", link: "/shop?category=home-outdoor" },
    { title: "Jewelry", imageUrl: "https://img.heroui.chat/image/book?w=400&h=400&u=6", link: "/shop?category=jewelry" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-2">Shop by Category</h2>
        <p className="text-gray-600 mb-8">Find exactly what you're looking for</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              imageUrl={category.imageUrl}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};