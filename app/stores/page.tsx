// app/stores/page.tsx
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const prisma = new PrismaClient();

export default async function StoresPage() {
  const stores = await prisma.shop.findMany({
    include: {
      owner: true,
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
    <div className="flex flex-col h-dvh items-center gap-5">
      <h1 className='text-3xl font-bold py-5'>All Stores</h1>
      {stores.map((store) => (
        <Card key={store.id} className='w-[380px]'>
          <Link href={`/stores/${store.id}`}>
            <CardHeader >
              <CardTitle>{store.owner.name}'s Store</CardTitle>
              <CardDescription>{store.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <div style={{ display: 'flex' }}>
                {generateStarDivs(Math.round(getAverageRating(store.Rating)))}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}