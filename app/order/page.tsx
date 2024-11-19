// app/order/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';

interface UserLocation {
  id: number;
  street: string;
  number: number;
  zipcode: number;
  country: string;
  notes: string;
}

function OrderPageContent() {
  const { data: session } = useSession();
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [orderNotes, setOrderNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user location
  useEffect(() => {
    const fetchLocation = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch('/api/user/location');
        if (!response.ok) throw new Error('Failed to fetch location');
        
        const data = await response.json();
        setUserLocation(data);
      } catch (err) {
        setError('Could not fetch user location');
      }
    };

    fetchLocation();
  }, [session]);

  const handlePlaceOrder = async () => {
    if (!session?.user?.email) {
      setError('Please log in to place an order');
      return;
    }

    if (!userLocation) {
      setError('Please complete your location profile');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
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
          locationId: userLocation.id
        })
      });

      if (!response.ok) throw new Error('Order placement failed');

      // Clear cart after successful order
      clearCart();
      
      // Redirect to order confirmation
      router.push('/order/confirmation');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <div>Please log in to place an order</div>;
  }

  return (
    <div>
      <h1>Place Order</h1>

      {/* Cart Items */}
      <section>
        <h2>Your Cart</h2>
        {cart.map(item => (
          <div key={item.productId}>
            {item.name} - ${item.price} x {item.quantity}
          </div>
        ))}
        <p>Total: ${getTotalPrice().toFixed(2)}</p>
      </section>

      {/* Delivery Location */}
      <section>
        <h2>Delivery Location</h2>
        {userLocation ? (
          <div>
            {userLocation.street} {userLocation.number}
            <br />
            {userLocation.zipcode}, {userLocation.country}
          </div>
        ) : (
          <div>No delivery address set. Please update in profile.</div>
        )}
      </section>

      {/* Order Notes */}
      <section>
        <h2>Order Notes</h2>
        <textarea 
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="Any special instructions?"
        />
      </section>

      {/* Error Display */}
      {error && <div>{error}</div>}

      {/* Place Order Button */}
      <button 
        onClick={handlePlaceOrder}
        disabled={isLoading || cart.length === 0}
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}

export default function OrderPage() {
  return (
    <CartProvider>
      <OrderPageContent />
    </CartProvider>
  );
}