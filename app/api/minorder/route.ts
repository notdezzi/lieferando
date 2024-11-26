// app/api/user/location/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {    
    // Find the user with their delivery location
    const searchParams = request.nextUrl.searchParams
    const searchZipcode = searchParams.get('shopId')

    const user = await prisma.shop.findUnique({
      where: { id: parseInt(searchZipcode)}
    });

    return NextResponse.json(user.minorder);
  } catch (error) {
    console.error('Fetch location error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}