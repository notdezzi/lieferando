// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse the request body safely
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { products, totalPrice, notes, locationId } = requestBody;

    // Validate required fields
    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Invalid products' }, { status: 400 });
    }

    // Find the user with location details
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        location: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create order with location details
    const order = await prisma.order.create({
      data: {
        userid: user.id,
        shopid: products[0].shopId,
        totalprice: totalPrice,
        date: new Date(),
        items: {
          connect: products.map((product: { productId: number }) => ({
            id: product.productId
          }))
        },
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    // More detailed error logging
    console.error('Order creation full error:', error);
    
    // If it's a Prisma error, log more details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}