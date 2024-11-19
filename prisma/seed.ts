import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.$transaction([
        prisma.rating.deleteMany(),
        prisma.menu.deleteMany(),
        prisma.order.deleteMany(),
        prisma.product.deleteMany(),
        prisma.shop.deleteMany(),
        prisma.user.deleteMany(),
        prisma.location.deleteMany(),
    ])

    // Create locations
    const locations = await Promise.all([
        prisma.location.create({
            data: {
                street: "Main Street",
                number: 123,
                zipcode: 12345,
                country: "USA",
                notes: "Near the park"
            }
        }),
        prisma.location.create({
            data: {
                street: "Broadway",
                number: 456,
                zipcode: 67890,
                country: "USA",
                notes: "Corner building"
            }
        }),
        prisma.location.create({
            data: {
                street: "Oak Avenue",
                number: 789,
                zipcode: 11223,
                country: "USA",
                notes: "Behind mall"
            }
        }),
        prisma.location.create({
            data: {
                street: "Pine Street",
                number: 101,
                zipcode: 44556,
                country: "USA",
                notes: "Next to subway"
            }
        })
    ])

    // Create users with different roles
    const hashedPassword = await hash('password123', 10)
    const users = await Promise.all([
        // Customer
        prisma.user.create({
            data: {
                name: "John Doe",
                username: "johndoe",
                password: hashedPassword,
                email: "john@example.com",
                type: "CUSTOMER",
                deliverylocation: locations[0].id
            }
        }),
        // First Shop Owner
        prisma.user.create({
            data: {
                name: "Jane Smith",
                username: "janesmith",
                password: hashedPassword,
                email: "jane@example.com",
                type: "SHOP_OWNER",
                deliverylocation: locations[1].id
            }
        }),
        // Second Shop Owner
        prisma.user.create({
            data: {
                name: "Bob Johnson",
                username: "bobjohnson",
                password: hashedPassword,
                email: "bob@example.com",
                type: "SHOP_OWNER",
                deliverylocation: locations[2].id
            }
        }),
        // Driver
        prisma.user.create({
            data: {
                name: "Mike Wilson",
                username: "mikewilson",
                password: hashedPassword,
                email: "mike@example.com",
                type: "DRIVER",
                deliverylocation: locations[3].id
            }
        })
    ])

    // Create shops with different owners
    const shops = await Promise.all([
        prisma.shop.create({
            data: {
                ownerid: users[1].id, // Jane's shop
                description: "Best Pizza in Town"
            }
        }),
        prisma.shop.create({
            data: {
                ownerid: users[2].id, // Bob's shop
                description: "Authentic Italian Cuisine"
            }
        })
    ])

    // Create products
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: "Margherita Pizza",
                description: "Classic tomato and mozzarella",
                price: 12.99,
                shopid: shops[0].id
            }
        }),
        prisma.product.create({
            data: {
                name: "Pepperoni Pizza",
                description: "Spicy pepperoni with cheese",
                price: 14.99,
                shopid: shops[0].id
            }
        }),
        prisma.product.create({
            data: {
                name: "Pasta Carbonara",
                description: "Creamy pasta with bacon",
                price: 16.99,
                shopid: shops[1].id
            }
        }),
        prisma.product.create({
            data: {
                name: "Lasagna",
                description: "Homemade lasagna with meat sauce",
                price: 18.99,
                shopid: shops[1].id
            }
        })
    ])

    // Create menus
    const menus = await Promise.all([
        prisma.menu.create({
            data: {
                shopid: shops[0].id,
                title: "Pizza Menu",
                description: "Our delicious pizzas",
                products: {
                    connect: [
                        { id: products[0].id },
                        { id: products[1].id }
                    ]
                }
            }
        }),
        prisma.menu.create({
            data: {
                shopid: shops[1].id,
                title: "Pasta Menu",
                description: "Fresh pasta dishes",
                products: {
                    connect: [
                        { id: products[2].id },
                        { id: products[3].id }
                    ]
                }
            }
        })
    ])

    // Create orders
    const orders = await Promise.all([
        prisma.order.create({
            data: {
                userid: users[0].id,
                shopid: shops[0].id,
                totalprice: 27.98,
                date: new Date(),
                items: {
                    connect: [
                        { id: products[0].id },
                        { id: products[1].id }
                    ]
                }
            }
        }),
        prisma.order.create({
            data: {
                userid: users[0].id,
                shopid: shops[1].id,
                totalprice: 35.98,
                date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
                items: {
                    connect: [
                        { id: products[2].id },
                        { id: products[3].id }
                    ]
                }
            }
        })
    ])

    // Create ratings
    const ratings = await Promise.all([
        prisma.rating.create({
            data: {
                description: "Great service and food!",
                rating: 5,
                driverid: users[3].id,
                shopid: shops[0].id
            }
        }),
        prisma.rating.create({
            data: {
                description: "Food was good but delivery was slow",
                rating: 4,
                driverid: users[3].id,
                shopid: shops[1].id
            }
        })
    ])

    console.log({
        locations: locations.length,
        users: users.length,
        shops: shops.length,
        products: products.length,
        menus: menus.length,
        orders: orders.length,
        ratings: ratings.length
    })
    console.log('Mock data created successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })