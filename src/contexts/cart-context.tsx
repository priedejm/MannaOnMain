import React, { createContext, useContext, useState, useEffect } from "react";

    interface CartItem {
      id: string;
      quantity: number;
    }

    interface CartContextType {
      items: CartItem[];
      addItem: (id: string, quantity?: number) => void;
      removeItem: (id: string) => void;
      updateQuantity: (id: string, quantity: number) => void;
      clearCart: () => void;
      itemCount: number;
      showNotification: boolean;
      setShowNotification: (show: boolean) => void;
    }

    const CartContext = createContext<CartContextType | undefined>(undefined);

    export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [items, setItems] = useState<CartItem[]>([
        { id: "1", quantity: 1 },
        { id: "3", quantity: 2 }
      ]);
      const [showNotification, setShowNotification] = useState(false);
      
      const itemCount = items.reduce((total, item) => total + item.quantity, 0);
      
      const addItem = (id: string, quantity = 1) => {
        setItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === id);
          
          if (existingItem) {
            return prevItems.map(item => 
              item.id === id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            );
          } else {
            return [...prevItems, { id, quantity }];
          }
        });
        
        // Show notification when item is added
        setShowNotification(true);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      };
      
      const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      };
      
      const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        );
      };
      
      const clearCart = () => {
        setItems([]);
      };
      
      // Load cart from localStorage on initial render
      useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (e) {
            console.error('Failed to parse cart from localStorage');
          }
        }
      }, []);
      
      // Save cart to localStorage whenever it changes
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
      }, [items]);
      
      return (
        <CartContext.Provider value={{
          items,
          addItem,
          removeItem,
          updateQuantity,
          clearCart,
          itemCount,
          showNotification,
          setShowNotification
        }}>
          {children}
        </CartContext.Provider>
      );
    };

    export const useCart = () => {
      const context = useContext(CartContext);
      if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
      }
      return context;
    };