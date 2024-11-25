// app/stores/page.tsx
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function StoresPage() {
  const stores = await prisma.shop.findMany({
    include: {
      owner: true,
      menus: true,
      Rating: true
    }
  });

  // Function to calculate average rating
  const getAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / ratings.length;
  };

  // Function to generate star divs
  const generateStarDivs = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={i}>
          {i <= rating ? "★" : "☆"}
        </div>
      );
    }
    return stars;
  };

  return (
    <div>
      <h1>All Stores</h1>
      {stores.map((store) => (
        <div key={store.id}>
          <Link href={`/stores/${store.id}`}>
            <h2>{store.owner.name}'s Store</h2>
            <p>Description: {store.description}</p>
            <div>
              <div style={{ display: 'flex' }}>
                {generateStarDivs(Math.round(getAverageRating(store.Rating)))}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}