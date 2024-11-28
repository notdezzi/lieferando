'use client';
import styles from '@/app/order/payment/payment.module.css'
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

interface UserLocation {
  id: number;
  street: string;
  number: number;
  zipcode: number;
  country: string;
  notes: string;
}

function OrderConfirmationPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { cart, getTotalPrice, clearCart, getShopId } = useCart();
  const router = useRouter();
  const [orderNotes, setOrderNotes] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [method, setMethod] = useState <string | null>(null)

  useEffect(() =>{
    const fetchMethod = async () =>{
      try{
        const response = await fetch(`/api/confirmation?paymentMethod=${method}`);
        if(!response.ok){
          throw new Error('Failed to fetch payment method');
        }
        const data = await response.json();
        console.log(data)
        setMethod(data.method);
      } catch (error) {
        console.error('Error fetching payment method:', error);
        setMethod(null);
      }
      }
    })

  const handlePlaceOrder = async () => {
    try {
      setError('');
      setIsLoading(true);
      const response = await fetch('/api/orders', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           products: cart.map(item => ({
             productId: item.productId,
             quantity: item.quantity
           })),
           totalPrice: getTotalPrice(),
           notes: orderNotes,
           locationId: userLocation!.id
         })
       });

       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error || 'Failed to place order');
       }

      // Clear cart and redirect on success
      clearCart();
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
    return(
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Bestellnummer:</h2>
          <div className="space-y-2 flex flex-col gap-2">
            {cart.map((item)=>(
              <div key={item.productId} className="flex justify-between items-center align-center">
                <span className="font-medium flex gap-2 min-w-72 align-center">
                  {item.name}
                </span>
                <span className="text-muted-foreground flex gap-2 align-center">
                  {item.quantity}
                </span>
                {(item.price*item.quantity) > 10 ?(
                      <span className='min-w-24'>{(item.price * item.quantity).toFixed(2)}$</span>
                    ):(
                      <span className='min-w-24'>&nbsp;&nbsp;{(item.price * item.quantity).toFixed(2)}$</span>
                    )
                    }
            </div>
            ))}
            <div className="flex justify-between font-semibold">
            <span>Zahlungsmethode{method}</span>
            <span>Total</span>
            <span className='min-w-24'>{getTotalPrice().toFixed(2)}$</span>
            
            </div>
            <a href="/">
              <button
                className={styles.backButton}
                >Back to Homepage
              </button>
            </a>
            </div>
          </div>
        </div>
      
    )
}

export default function OrderConfirmation() {
  return (
    <CartProvider>
      <OrderConfirmationPage />
    </CartProvider>
  );
}