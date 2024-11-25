import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function OrderConfirmedPage() {
  return (
    <div>
        ORder confirmd
    </div>
  );
}