import React from "react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/MannaOnMainBackground.webp"
          alt="Manna on Main Storefront"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 logo-text text-white leading-tight">
              Resources to Strengthen Your Faith
            </h1>
            
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Our collection of Christian literature and gifts is continously expanding. If you're seeking a specific item not displayed on our website, please contact us - we'll either have it in stock or can special order it for you.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                as={Link}
                to="/shop"
                color="primary"
                variant="solid"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                startContent={<Icon icon="lucide:shopping-bag" width={18} />}
              >
                Browse Collection
              </Button>
              
              <Button
                as="a"
                href="tel:+13364344663"
                variant="bordered"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                startContent={<Icon icon="lucide:phone" width={18} />}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};