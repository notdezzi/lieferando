// app/api/user/location/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Find the user with their delivery location
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        location: true
      }
    });

    if (!user || !user.location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json(user.location);
  } catch (error) {
    console.error('Fetch location error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}