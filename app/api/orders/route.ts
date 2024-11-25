// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// POST endpoint to create an order
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        let requestBody;
        try {
            requestBody = await request.json();
        } catch (parseError) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const { products, totalPrice, notes, locationId } = requestBody;

        // Validate required fields
        if (!products || !Array.isArray(products) || products.length === 0) {
            return NextResponse.json({ error: 'Invalid products' }, { status: 400 });
        }

        // Find the user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get the first product to determine the shop
        const firstProduct = await prisma.product.findUnique({
            where: { id: products[0].productId },
            select: { shopid: true }
        });

        if (!firstProduct) {
            return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
        }

        // Verify all products exist and belong to the same shop
        const productIds = products.map(p => p.productId);
        const existingProducts = await prisma.product.findMany({
            where: { 
                id: { in: productIds },
                shopid: firstProduct.shopid
            }
        });

        if (existingProducts.length !== products.length) {
            return NextResponse.json({ 
                error: 'All products must exist and belong to the same shop' 
            }, { status: 400 });
        }

        // Create the order
        const order = await prisma.order.create({
            data: {
                userid: user.id,
                shopid: firstProduct.shopid,
                totalprice: totalPrice,
                date: new Date(),
                items: {
                    connect: products.map(product => ({
                        id: product.productId
                    }))
                }
            },
            include: {
                items: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                shop: {
                    select: {
                        description: true
                    }
                }
            }
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
