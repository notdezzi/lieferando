// app/stores/[storeId]/page.tsx
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function StoreDetailPage({
  params
}: {
  params: { storeId: string }
}) {
  const storeId = await parseInt(params.storeId);

  const store = await prisma.shop.findUnique({
    where: { id: storeId },
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
    <div>
      <h1>{store.owner.name}'s Store</h1>
      <p>Description: {store.description}</p>
      <section>
        <h2>Menus</h2>
        {store.menus.map((menu) => (
          <div key={menu.id}>
            <h3>{menu.title}</h3>
            <p>{menu.description}</p>
            
            <h4>Menu Products</h4>
            {menu.products.map((product) => (
              <div key={product.id}>
                <p>{product.name} - ${product.price}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}