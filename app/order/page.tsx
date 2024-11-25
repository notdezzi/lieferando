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

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  shopId: number;
}

function OrderPageContent() {
  const { data: session } = useSession();
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [orderNotes, setOrderNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [error, setError] = useState('');

  // Fetch user location
  useEffect(() => {
    const fetchLocation = async () => {
      if (!session?.user?.email) {
        setIsFetchingLocation(false);
        return;
      }

      try {
        const response = await fetch('/api/user/location');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch location');
        }

        const data = await response.json();
        setUserLocation(data);
      } catch (err) {
        setError('Could not fetch delivery location. Please update your profile.');
      } finally {
        setIsFetchingLocation(false);
      }
    };

    fetchLocation();
  }, [session]);

  const validateOrder = () => {
    if (!session?.user?.email) {
      throw new Error('Please log in to place an order');
    }

    if (!userLocation) {
      throw new Error('Please complete your location profile');
    }

    if (cart.length === 0) {
      throw new Error('Your cart is empty');
    }

    // Check if all items are from the same shop
    const shopId = cart[0]?.shopId;
    const hasMultipleShops = cart.some(item => item.shopId !== shopId);
    if (hasMultipleShops) {
      throw new Error('All items must be from the same shop');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setError('');
      setIsLoading(true);

      // Validate order
      validateOrder();

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
      router.push('/order/confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="">Please log in to place an order</div>
    );
  }

  if (isFetchingLocation) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">

        loading
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-6">
        {/* Cart Items */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground"> x {item.quantity}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Delivery Location */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Delivery Location</h2>
          {userLocation ? (
            <div className="space-y-1">
              <p>{userLocation.street} {userLocation.number}</p>
              <p>{userLocation.zipcode}, {userLocation.country}</p>
              {userLocation.notes && (
                <p className="text-sm text-muted-foreground">{userLocation.notes}</p>
              )}
            </div>
          ) : (
            <div className="">error</div>
          )}
        </section>

        {/* Order Notes */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Order Notes</h2>
        </section>

        {/* Error Display */}
        {error && (
          <div className="">error</div>
        )}
        <button
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={isLoading || cart.length === 0 || !userLocation}
        >
          {/* Place Order Button */}
          {isLoading ? (
            <>
              Placing Order...
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
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