// app/stores/[storeId]/AddToCartButton.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';


interface Product {
  id: number;
  name: string;
  price: number;
  productId: number;
  shopId: number;
}

export default function OneMoreButton({product}:{product: Product}){
    const{ addToCart } = useCart();
    const[isAdding, setIsAdding] = useState(false);
    const{data:session} = useSession();

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdding(true);
        setTimeout(() => setIsAdding(false),1000);
    }
    
    return (
        <Button
            variant = "ghost"
            onClick={handleAddToCart}
        >
        <Plus/>
        </Button>
    )
}