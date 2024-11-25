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

    const locationSeeds = [
        {
            street: "Pine Street",
            number: 101,
            zipcode: 44556,
            country: "USA",
            notes: "Next to subway"
        },
        {
            street: "Maple Avenue",
            number: 234,
            zipcode: 44557,
            country: "USA",
            notes: "Corner building"
        },
        {
            street: "Oak Drive",
            number: 567,
            zipcode: 44558,
            country: "USA",
            notes: "Behind shopping center"
        },
        {
            street: "Elm Street",
            number: 789,
            zipcode: 44559,
            country: "USA",
            notes: "Near park"
        },
        {
            street: "Cedar Lane",
            number: 321,
            zipcode: 44560,
            country: "USA",
            notes: "Next to school"
        },
        {
            street: "Birch Road",
            number: 432,
            zipcode: 44561,
            country: "USA",
            notes: "Near hospital"
        },
        {
            street: "Willow Way",
            number: 876,
            zipcode: 44562,
            country: "USA",
            notes: "Next to library"
        },
        {
            street: "Spruce Court",
            number: 543,
            zipcode: 44563,
            country: "USA",
            notes: "Near fire station"
        },
        {
            street: "Magnolia Boulevard",
            number: 654,
            zipcode: 44564,
            country: "USA",
            notes: "Shopping district"
        },
        {
            street: "Cherry Street",
            number: 987,
            zipcode: 44565,
            country: "USA",
            notes: "Restaurant row"
        },
        {
            street: "Sycamore Lane",
            number: 111,
            zipcode: 33445,
            country: "USA",
            notes: "Business district"
        },
        {
            street: "Poplar Avenue",
            number: 222,
            zipcode: 33446,
            country: "USA",
            notes: "Near beach"
        },
        {
            street: "Chestnut Drive",
            number: 333,
            zipcode: 33447,
            country: "USA",
            notes: "Tourist area"
        },
        {
            street: "Redwood Road",
            number: 444,
            zipcode: 33448,
            country: "USA",
            notes: "Historic district"
        },
        {
            street: "Sequoia Street",
            number: 555,
            zipcode: 33449,
            country: "USA",
            notes: "Arts district"
        },
        {
            street: "Dogwood Lane",
            number: 666,
            zipcode: 22334,
            country: "USA",
            notes: "University area"
        },
        {
            street: "Ash Court",
            number: 777,
            zipcode: 22335,
            country: "USA",
            notes: "Sports complex nearby"
        },
        {
            street: "Beech Boulevard",
            number: 888,
            zipcode: 22336,
            country: "USA",
            notes: "Entertainment district"
        },
        {
            street: "Hickory Avenue",
            number: 999,
            zipcode: 22337,
            country: "USA",
            notes: "Financial district"
        },
        {
            street: "Juniper Drive",
            number: 123,
            zipcode: 22338,
            country: "USA",
            notes: "Cultural center area"
        },
        {
            street: "Walnut Street",
            number: 456,
            zipcode: 11223,
            country: "USA",
            notes: "Theater district"
        },
        {
            street: "Locust Lane",
            number: 789,
            zipcode: 11224,
            country: "USA",
            notes: "Museum quarter"
        },
        {
            street: "Hawthorn Road",
            number: 147,
            zipcode: 11225,
            country: "USA",
            notes: "Convention center area"
        },
        {
            street: "Cypress Avenue",
            number: 258,
            zipcode: 11226,
            country: "USA",
            notes: "Marina district"
        },
        {
            street: "Palm Boulevard",
            number: 369,
            zipcode: 11227,
            country: "USA",
            notes: "Waterfront area"
        },
        {
            street: "Acacia Drive",
            number: 951,
            zipcode: 55667,
            country: "USA",
            notes: "Technology park"
        },
        {
            street: "Alder Court",
            number: 753,
            zipcode: 55668,
            country: "USA",
            notes: "Research center nearby"
        },
        {
            street: "Aspen Lane",
            number: 852,
            zipcode: 55669,
            country: "USA",
            notes: "Innovation district"
        },
        {
            street: "Bamboo Road",
            number: 741,
            zipcode: 55670,
            country: "USA",
            notes: "Startup hub"
        },
        {
            street: "Banyan Street",
            number: 963,
            zipcode: 55671,
            country: "USA",
            notes: "Media district"
        },
        {
            street: "Catalpa Avenue",
            number: 159,
            zipcode: 66778,
            country: "USA",
            notes: "Fashion district"
        },
        {
            street: "Eucalyptus Drive",
            number: 357,
            zipcode: 66779,
            country: "USA",
            notes: "Design district"
        },
        {
            street: "Fir Boulevard",
            number: 852,
            zipcode: 66780,
            country: "USA",
            notes: "Craft brewery area"
        },
        {
            street: "Ginkgo Lane",
            number: 741,
            zipcode: 66781,
            country: "USA",
            notes: "Artisan quarter"
        },
        {
            street: "Holly Road",
            number: 963,
            zipcode: 66782,
            country: "USA",
            notes: "Boutique district"
        },
        {
            street: "Ironwood Court",
            number: 147,
            zipcode: 77889,
            country: "USA",
            notes: "Gallery row"
        },
        {
            street: "Jacaranda Avenue",
            number: 258,
            zipcode: 77890,
            country: "USA",
            notes: "Coffee shop district"
        },
        {
            street: "Kumquat Drive",
            number: 369,
            zipcode: 77891,
            country: "USA",
            notes: "Farm-to-table area"
        },
        {
            street: "Larch Boulevard",
            number: 951,
            zipcode: 77892,
            country: "USA",
            notes: "Culinary district"
        },
        {
            street: "Mahogany Street",
            number: 753,
            zipcode: 77893,
            country: "USA",
            notes: "Food truck park nearby"
        }
    ]
    
    // Use in your seed script:
    const locations = await Promise.all(
        locationSeeds.map(location => 
            prisma.location.create({
                data: location
            })
        )
    )

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
                description: "Best Pizza in Town",
                storelocation: locations[4].id
            }
        }),
        prisma.shop.create({
            data: {
                ownerid: users[2].id, // Bob's shop
                description: "Authentic Italian Cuisine",
                storelocation: locations[5].id
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