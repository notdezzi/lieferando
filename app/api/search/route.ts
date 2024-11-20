// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

// Simple ZIP code distance calculation
// Returns true if ZIP codes are within rough distance of each other
function isWithinRadius(zipcode1: number, zipcode2: number, radiusInZips: number): boolean {
    // Convert zipcodes to strings to handle leading zeros
    const zip1 = zipcode1.toString().padStart(5, '0')
    const zip2 = zipcode2.toString().padStart(5, '0')
    
    // Compare first few digits based on radius
    // This is a very rough approximation
    // First digit: ~500 miles
    // First two digits: ~50 miles
    // First three digits: ~10 miles
    
    let digitsToCompare
    if (radiusInZips <= 10) {
        digitsToCompare = 3 // Check first three digits (~10 mile radius)
    } else if (radiusInZips <= 50) {
        digitsToCompare = 2 // Check first two digits (~50 mile radius)
    } else {
        digitsToCompare = 1 // Check first digit (~500 mile radius)
    }
    
    return zip1.substring(0, digitsToCompare) === zip2.substring(0, digitsToCompare)
}

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession()
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get query parameters
        const searchParams = request.nextUrl.searchParams
        const searchZipcode = searchParams.get('zipcode')
        const radiusSize = searchParams.get('radius') || 'medium' // 'small', 'medium', or 'large'

        if (!searchZipcode) {
            return NextResponse.json(
                { error: 'Zipcode is required' },
                { status: 400 }
            )
        }

        // Convert radius size to approximate ZIP code radius
        const radiusMap = {
            'small': 10,  // ~10 miles
            'medium': 50, // ~50 miles
            'large': 500  // ~500 miles
        }
        const radiusInZips = radiusMap[radiusSize as keyof typeof radiusMap] || 50

        // Get all shops with their locations
        const shops = await prisma.shop.findMany({
            include: {
                owner: {
                    include: {
                        location: true
                    }
                }
            }
        })

        // Filter shops within radius
        const nearbyShops = shops.filter(shop => {
            const shopZipcode = shop.owner.location?.zipcode
            if (!shopZipcode) return false

            return isWithinRadius(
                parseInt(searchZipcode),
                shopZipcode,
                radiusInZips
            )
        })

        // Format response with additional shop details
        const formattedShops = nearbyShops.map(shop => ({
            id: shop.id,
            description: shop.description,
            location: {
                street: shop.owner.location?.street,
                number: shop.owner.location?.number,
                zipcode: shop.owner.location?.zipcode,
                country: shop.owner.location?.country,
                notes: shop.owner.location?.notes
            },
        }))

        return NextResponse.json({
            shops: formattedShops,
            total: formattedShops.length,
            searchRadius: radiusSize
        })
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}