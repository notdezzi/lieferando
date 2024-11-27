'use client';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from '@/app/order/payment/payment.module.css'
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';


const prisma = new PrismaClient();

interface UserLocation {
  id: number;
  street: string;
  number: number;
  zipcode: number;
  country: string;
  notes: string;
}
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  shopId: number;
}

export default function OrderPaymentPage() {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { cart, getTotalPrice, clearCart, getShopId } = useCart();
  const [orderNotes, setOrderNotes] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const router = useRouter();

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

      //Clear cart and redirect on success
      clearCart();
      router.push('/order/confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

return (
  <div className="max-w-2xl mx-auto p-4 space-y-6">
    <div className="space-y-6">
      {/* Payment Options */}
      <h2 className="text-xl font-semibold">Payment Options</h2>
      <div className="space-y-2 flex flex-col gap-2">
        <button
          className={styles.paypalButton}
        //onClick={}
        >Pay with PayPal(Demo)
        </button>
        <button
          className="w-full"
        //onClick={}
        >Pay with Credit Card(Demo)
        </button>
        <a href="/order">
          <button
            className={styles.backButton}
          >Back to Order</button>
        </a>
      </div>
    </div>
  </div>
);}