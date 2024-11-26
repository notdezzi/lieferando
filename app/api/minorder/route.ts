// app/api/minorder/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {    
    const searchParams = request.nextUrl.searchParams;
    const shopId = searchParams.get('shopId');

    if (!shopId) {
      return NextResponse.json({ error: 'Shop ID is required' }, { status: 400 });
    }

    const shop = await prisma.shop.findUnique({
      where: { id: parseInt(shopId) }
    });

    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
    }

    return NextResponse.json({ minOrder: shop.minorder });
  } catch (error) {
    console.error('Fetch minimum order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}