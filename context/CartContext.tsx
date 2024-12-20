// context/CartContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

interface CartItem {
  shopId: number;
  id: number;
  name: string;
  price: number;
  quantity: number;
  productId: number;
}

interface CartContextType {
  cart: CartItem[];
  getShopId: () => number | null;  // Updated return type
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on client-side
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const session = getServerSession;
    if(!session){
      redirect("/register");
    } else {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.productId === product.productId);
        if (existingItem) {
          return prevCart.map(item => 
            item.productId === product.productId 
              ? {...item, quantity: item.quantity + 1}
              : item
          );
        } else {
          return [...prevCart, {...product, quantity: 1}];
        }
      });
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => 
      quantity > 0
        ? prevCart.map(item => 
            item.productId === productId 
              ? {...item, quantity}
              : item
          )
        : prevCart.filter(item => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getShopId = () => {
    // Return null if cart is empty, otherwise return the first item's shopId
    return cart.length > 0 ? cart[0].shopId : null;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart, 
      getShopId,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};