import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function StoreRatingsPage({
    params
  }: {
    params: { storeId: string }
  }) {
    const { storeId } = await params;
  
  const store = await prisma.shop.findUnique({
    where: { id: parseInt(storeId) },
    include: {
      owner: true,
      Rating: {
        include: {
          driver: true 
        }
      }
    }
  });

  if (!store) {
    return <div>Store not found</div>;
  }

  // Calculate average rating
  const getAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / ratings.length;
  };

  // Function to generate stars for a rating
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
      <Link href={`/stores/${storeId}`}>← Back to Store</Link>
      
      <h1>{store.owner.name}'s Store - Ratings</h1>
      <p>{store.description}</p>
      
      <div>
        <h2>Overall Rating: {Math.round(getAverageRating(store.Rating))} / 5</h2>
        <div>{generateStarDivs(Math.round(getAverageRating(store.Rating)))}</div>
        <p>Total Reviews: {store.Rating.length}</p>
      </div>

      <h2>All Reviews</h2>
      {store.Rating.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <div>
          {store.Rating.map((rating) => (
            <div key={rating.id}>
              <div>
                {generateStarDivs(Math.round(rating.rating))}
                <span> ({rating.rating}/5)</span>
              </div>
              <p>Reviewed by: {rating.driver.name}</p>
              <p>{rating.description}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Add error handling
export async function generateStaticParams() {
  const stores = await prisma.shop.findMany({
    select: { id: true }
  });

  return stores.map((store) => ({
    id: store.id.toString(),
  }));
}