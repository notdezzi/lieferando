// app/stores/[storeId]/AddToCartButton.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash } from 'lucide-react';


interface Product {
  productId: number;
  count: number;
}

export default function RemoveButton({product}:{product: Product}){
    const{updateQuantity} = useCart();
    const[isAdding, setIsAdding] = useState(false);
    const{data:session} = useSession();

    const handleUpdateQuantity = () => {
        if(product.count > 0){
            updateQuantity(product.productId,0);
            setIsAdding(true);
            setTimeout(() => setIsAdding(false),1000);
        }
    }
    return (
        <Button
            variant = "ghost"
            onClick={handleUpdateQuantity}
        >
        <Trash/>
        </Button>
    )
}