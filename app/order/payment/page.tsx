'use client';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from '@/app/order/payment/payment.module.css'
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';


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

function OrderPaymentPage() {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { cart, getTotalPrice, clearCart, getShopId } = useCart();
  const [orderNotes, setOrderNotes] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const router = useRouter();

return (
  <div className="max-w-2xl mx-auto p-4 space-y-6">
    <div className="space-y-6">
      {/* Payment Options */}
      <h2 className="text-xl font-semibold">Payment Options</h2>
      <div className="space-y-2 flex flex-col gap-2">
        <a href='/order/confirmation/PayPal'>
        <button
          className={styles.paypalButton}
        >Pay with PayPal(Demo)
        </button>
        </a>
        {/* <a href='/order/confirmation/CreditCard'>
        <button
          className="w-full"
        >Pay with Credit Card(Demo)
        </button>
        </a> */}
        <a href="/order">
          <button
            className={styles.backButton}
          >Back to Order</button>
        </a>
      </div>
    </div>
  </div>
);}

export default function OrderPayment() {
  return (
    <CartProvider>
      <OrderPaymentPage/>
    </CartProvider>
  );
}