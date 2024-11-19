// app/stores/page.tsx
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function StoresPage() {
  const stores = await prisma.shop.findMany({
    include: {
      owner: true,
      menus: true,//{
      //   include: {
      //     products: true
      //   }
      // },
      // _count: {
      //   select: { Product: true }
      // }
    }
  });

  return (
    <div>
      <h1>All Stores</h1>
      {stores.map((store) => (
        <div key={store.id}>
          <Link href={`/stores/${store.id}`}>
            <h2>{store.owner.name}'s Store</h2>
            <p>Description: {store.description}</p>
            {/* <p>Total Products: {store.menus}</p> */}
          </Link>
        </div>
      ))}
    </div>
  );
}