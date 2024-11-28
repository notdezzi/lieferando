'use client';
import styles from '@/app/order/payment/payment.module.css'
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function OrderPaymentPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { cart, getTotalPrice, clearCart, getShopId } = useCart();
  const router = useRouter();

  const handleOrder = async () =>{
    try {
      setError('');
      setIsLoading(true);
      clearCart();
      router.push('/order/confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }
    return(
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Bestellnummer:{}</h2>
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
            <span>Total</span>
            <span className='min-w-24'>{getTotalPrice().toFixed(2)}$</span>
            <h3>Zahlungsmethode</h3>
            <a href="/">
              <button
                className={styles.backButton}
                >Back to Homepage
              </button>
            </a>
            </div>
          </div>
        </div>
      </div>
    )
}