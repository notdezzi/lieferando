import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try { 
        const searchParams = request.nextUrl.searchParams
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}