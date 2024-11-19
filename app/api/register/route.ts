import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const {
            name,
            email,
            username,
            password,
            type,
            street,
            number,
            zipcode,
            country,
            notes
        } = body

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        })

        if (existingUser) {
            return NextResponse.json(
                { message: 'Email or username already exists' },
                { status: 400 }
            )
        }

        // Hash the password
        const hashedPassword = await hash(password, 10)

        // Create location first
        const location = await prisma.location.create({
            data: {
                street,
                number: parseInt(number),
                zipcode: parseInt(zipcode),
                country,
                notes
            }
        })

        // Create user with location
        const user = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword,
                type,
                deliverylocation: location.id
            }
        })

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(
            { message: 'User created successfully', user: userWithoutPassword },
            { status: 201 }
        )
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { message: 'Error creating user' },
            { status: 500 }
        )
    }
}