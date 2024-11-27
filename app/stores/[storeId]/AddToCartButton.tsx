// app/stores/[storeId]/AddToCartButton.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  productId: number;
  shopId: number;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const { data: session } = useSession();

  const handleAddToCart = () => {
    if(!session){
      redirect("/login");
    }else{
      
    addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  }
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={`
        px-4 py-2 rounded 
        ${isAdding ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}
      `}
    >
      {isAdding ? 'Added!' : 'Add to Cart'}
    </button>
  );
}