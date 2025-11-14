import React from "react";
    import { Button } from "@heroui/react";
    import { Link } from "react-router-dom";
    import { Icon } from "@iconify/react";
    import { motion, AnimatePresence } from "framer-motion";
    import { useCart } from "../contexts/cart-context";
    import { useLocation } from "react-router-dom";

    export const CartNotification: React.FC = () => {
      const { itemCount } = useCart();
      const location = useLocation();
      
      // Hide notification when on the cart page
      const isCartPage = location.pathname === "/cart";
      
      return (
        <AnimatePresence>
          {itemCount > 0 && !isCartPage && (
            <motion.div 
              className="fixed top-25 right-6 z-50" 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Link to="/cart">
                <Button
                  color="primary"
                  size="md"
                  className="shadow-lg px-3 py-1"
                  startContent={<Icon icon="lucide:shopping-bag" width={18} />}
                  endContent={<Icon icon="lucide:chevron-right" width={14} />}
                >
                  <span className="whitespace-nowrap">View Cart ({itemCount})</span>
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };