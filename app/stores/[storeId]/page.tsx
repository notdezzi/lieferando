// app/stores/[storeId]/page.tsx
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import AddToCartButton from './AddToCartButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
const prisma = new PrismaClient();

export default async function StoreDetailPage({
  params
}: {
  params: { storeId: string }
}) {
  const { storeId } = await params;

  const store = await prisma.shop.findUnique({
    where: { id: parseInt(storeId) },
    include: {
      owner: true,
      menus: {
        include: {
          products: true
        }
      }
    }
  });

  if (!store) {
    notFound();
  }

  return (
    <CartProvider>
      <div className="flex flex-col h-dvh items-center gap-5">
        <h1 className='text-3xl font-bold py-2'>{store.owner.name}'s Store</h1>
        <p className='text-1xl font-semibold py-2'>{store.description}</p>
        <Link href={'/stores/'+storeId+'/ratings'}>Go to Ratings</Link>
        <section>
          {store.menus.map((menu) => (
            <Card key={menu.id} className='w-[600px] my-5'>

              <CardHeader>
                <CardTitle>{menu.title}</CardTitle>
                <CardDescription>{menu.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {menu.products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between mb-2">
                    <p>{product.name} - ${product.price}</p>
                    <AddToCartButton
                      product={{
                        id: parseInt(storeId),
                        name: product.name,
                        price: product.price,
                        productId: product.id
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </CartProvider>
  );
}