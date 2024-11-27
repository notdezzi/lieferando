import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function OrderConfirmedPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-6">
        {/* Payment Options */}
        <h2 className="text-xl font-semibold">Payment Options</h2>
        <div className="space-y-2">
        <button
          className="w-full"
          //onClick={}
        >Pay with PayPal
        </button>
        <button
          className="w-full"
          //onClick={}
        >Pay with Credit Card
        </button>
        <button
          className="w-full"
          //onClick={}
        >Back to Order
        </button>
        </div>
      </div>
    </div>
  );
}