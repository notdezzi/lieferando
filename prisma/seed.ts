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
        // thrid Shop Owner
        prisma.user.create({
            data: {
                name: "Bob2 Johnson",
                username: "bob2johnson",
                password: hashedPassword,
                email: "bob2@example.com",
                type: "SHOP_OWNER",
                deliverylocation: locations[3].id
            }
        }),
        // thrid Shop Owner
        prisma.user.create({
            data: {
                name: "Bob22 Johnson",
                username: "bob22johnson",
                password: hashedPassword,
                email: "bob22@example.com",
                type: "SHOP_OWNER",
                deliverylocation: locations[4].id
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
                deliverylocation: locations[5].id
            }
        })
    ])

    // Assuming you have users and locations arrays already created

// Create shops with different owners and themes
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
    }),
    prisma.shop.create({
        data: {
            ownerid: users[3].id, // Sarah's shop
            description: "Fresh Sushi and Japanese Delights",
            storelocation: locations[6].id
        }
    }),
    prisma.shop.create({
        data: {
            ownerid: users[4].id, // Mike's shop
            description: "Gourmet Burger Haven",
            storelocation: locations[7].id
        }
    }),
    prisma.shop.create({
        data: {
            ownerid: users[5].id, // Emily's shop
            description: "Vegan Cafe & Bakery",
            storelocation: locations[8].id
        }
    })
])

// Create products for each shop
const products = await Promise.all([
    // Pizza Shop Products
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
            name: "Vegetarian Supreme Pizza",
            description: "Loaded with fresh vegetables",
            price: 15.99,
            shopid: shops[0].id
        }
    }),
    prisma.product.create({
        data: {
            name: "BBQ Chicken Pizza",
            description: "Tangy BBQ sauce with grilled chicken",
            price: 16.99,
            shopid: shops[0].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Quattro Formaggi Pizza",
            description: "Four cheese pizza",
            price: 17.99,
            shopid: shops[0].id
        }
    }),

    // Italian Cuisine Shop Products
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
    }),
    prisma.product.create({
        data: {
            name: "Risotto Milanese",
            description: "Saffron risotto with parmesan",
            price: 19.99,
            shopid: shops[1].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Seafood Linguine",
            description: "Mixed seafood in white wine sauce",
            price: 22.99,
            shopid: shops[1].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Tiramisu",
            description: "Classic Italian dessert",
            price: 8.99,
            shopid: shops[1].id
        }
    }),

    // Sushi Shop Products
    prisma.product.create({
        data: {
            name: "Salmon Sushi Roll",
            description: "Fresh salmon wrapped in rice and seaweed",
            price: 14.99,
            shopid: shops[2].id
        }
    }),
    prisma.product.create({
        data: {
            name: "California Roll",
            description: "Crab, avocado, and cucumber",
            price: 12.99,
            shopid: shops[2].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Tuna Sashimi",
            description: "Premium raw tuna slices",
            price: 16.99,
            shopid: shops[2].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Dragon Roll",
            description: "Eel and avocado topped roll",
            price: 18.99,
            shopid: shops[2].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Miso Soup",
            description: "Traditional Japanese soup",
            price: 5.99,
            shopid: shops[2].id
        }
    }),

    // Burger Shop Products
    prisma.product.create({
        data: {
            name: "Classic Cheeseburger",
            description: "Beef patty with cheddar cheese",
            price: 13.99,
            shopid: shops[3].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Bacon Deluxe Burger",
            description: "Burger with crispy bacon and special sauce",
            price: 15.99,
            shopid: shops[3].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Mushroom Swiss Burger",
            description: "Topped with sautéed mushrooms and swiss cheese",
            price: 16.99,
            shopid: shops[3].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Veggie Burger",
            description: "Plant-based patty with fresh toppings",
            price: 14.99,
            shopid: shops[3].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Loaded Fries",
            description: "Crispy fries topped with cheese and bacon",
            price: 8.99,
            shopid: shops[3].id
        }
    }),

    // Vegan Cafe Products
    prisma.product.create({
        data: {
            name: "Avocado Toast",
            description: "Sourdough with smashed avocado",
            price: 11.99,
            shopid: shops[4].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Quinoa Buddha Bowl",
            description: "Roasted vegetables and quinoa",
            price: 15.99,
            shopid: shops[4].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Vegan Chocolate Cake",
            description: "Rich chocolate cake without dairy",
            price: 7.99,
            shopid: shops[4].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Green Smoothie",
            description: "Kale, spinach, and banana blend",
            price: 6.99,
            shopid: shops[4].id
        }
    }),
    prisma.product.create({
        data: {
            name: "Lentil Curry",
            description: "Spicy vegan curry with rice",
            price: 16.99,
            shopid: shops[4].id
        }
    })
])

// Create menus for each shop
const menus = await Promise.all([
    // Pizza Shop Menus
    prisma.menu.create({
        data: {
            shopid: shops[0].id,
            title: "Classic Pizzas",
            description: "Our traditional pizza offerings",
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
            shopid: shops[0].id,
            title: "Vegetarian Pizzas",
            description: "Pizzas for plant lovers",
            products: {
                connect: [
                    { id: products[2].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[0].id,
            title: "Specialty Pizzas",
            description: "Our unique pizza creations",
            products: {
                connect: [
                    { id: products[3].id },
                    { id: products[4].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[0].id,
            title: "Family Pizzas",
            description: "Large pizzas for sharing",
            products: {
                connect: [
                    { id: products[0].id },
                    { id: products[1].id },
                    { id: products[3].id }
                ]
            }
        }
    }),

    // Italian Cuisine Shop Menus
    prisma.menu.create({
        data: {
            shopid: shops[1].id,
            title: "Pasta Selection",
            description: "Fresh homemade pasta dishes",
            products: {
                connect: [
                    { id: products[5].id },
                    { id: products[6].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[1].id,
            title: "Risotto and Seafood",
            description: "Delicate seafood and rice dishes",
            products: {
                connect: [
                    { id: products[7].id },
                    { id: products[8].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[1].id,
            title: "Italian Classics",
            description: "Traditional Italian favorites",
            products: {
                connect: [
                    { id: products[5].id },
                    { id: products[6].id },
                    { id: products[7].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[1].id,
            title: "Desserts",
            description: "Sweet Italian endings",
            products: {
                connect: [
                    { id: products[9].id }
                ]
            }
        }
    }),

    // Sushi Shop Menus
    prisma.menu.create({
        data: {
            shopid: shops[2].id,
            title: "Classic Rolls",
            description: "Traditional sushi rolls",
            products: {
                connect: [
                    { id: products[10].id },
                    { id: products[11].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[2].id,
            title: "Sashimi Selection",
            description: "Premium raw fish",
            products: {
                connect: [
                    { id: products[12].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[2].id,
            title: "Special Rolls",
            description: "Chef's unique creations",
            products: {
                connect: [
                    { id: products[13].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[2].id,
            title: "Sides and Soups",
            description: "Complementary dishes",
            products: {
                connect: [
                    { id: products[14].id }
                ]
            }
        }
    }),

    // Burger Shop Menus
    prisma.menu.create({
        data: {
            shopid: shops[3].id,
            title: "Classic Burgers",
            description: "Our standard burger offerings",
            products: {
                connect: [
                    { id: products[15].id },
                    { id: products[16].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[3].id,
            title: "Gourmet Burgers",
            description: "Premium burger selections",
            products: {
                connect: [
                    { id: products[17].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[3].id,
            title: "Vegetarian Options",
            description: "Plant-based burger choices",
            products: {
                connect: [
                    { id: products[18].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[3].id,
            title: "Sides",
            description: "Perfect accompaniments",
            products: {
                connect: [
                    { id: products[19].id }
                ]
            }
        }
    }),

    // Vegan Cafe Menus
    prisma.menu.create({
        data: {
            shopid: shops[4].id,
            title: "Breakfast Favorites",
            description: "Morning vegan delights",
            products: {
                connect: [
                    { id: products[20].id },
                    { id: products[22].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[4].id,
            title: "Healthy Bowls",
            description: "Nutritious plant-based meals",
            products: {
                connect: [
                    { id: products[21].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[4].id,
            title: "Drinks",
            description: "Refreshing vegan beverages",
            products: {
                connect: [
                    { id: products[23].id }
                ]
            }
        }
    }),
    prisma.menu.create({
        data: {
            shopid: shops[4].id,
            title: "Main Courses",
            description: "Hearty vegan dishes",
            products: {
                connect: [
                    { id: products[24].id }
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