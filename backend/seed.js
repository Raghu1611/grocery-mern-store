const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

dotenv.config();

const categories = [
    { name: 'Fruits', description: 'Fresh fruits', image: '🍎' },
    { name: 'Vegetables', description: 'Fresh vegetables', image: '🥬' },
    { name: 'Dairy', description: 'Milk and dairy products', image: '🥛' },
    { name: 'Bakery', description: 'Bread and baked goods', image: '🍞' },
    { name: 'Meat', description: 'Fresh meat', image: '🥩' },
    { name: 'Seafood', description: 'Fresh seafood', image: '🐟' },
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing data...');
        await Product.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({ email: 'admin@grocery.com' });

        console.log('📁 Creating categories...');
        const createdCategories = await Category.insertMany(categories);
        console.log(`✓ Created ${createdCategories.length} categories`);

        // Create category map for easy reference
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat._id;
        });

        console.log('🥕 Creating products...');
        const products = [
            {
                name: 'Fresh Apples',
                description: 'Crisp and sweet red apples, perfect for snacking or baking',
                category: categoryMap['Fruits'],
                price: 2.99,
                stock: 100,
                unit: 'kg',
                image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb',
                tags: ['fresh', 'organic', 'seasonal'],
                discount: 10,
            },
            {
                name: 'Organic Bananas',
                description: 'Rich in potassium, naturally sweet bananas',
                category: categoryMap['Fruits'],
                price: 1.49,
                stock: 150,
                unit: 'dozen',
                image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
                tags: ['fresh', 'organic'],
            },
            {
                name: 'Whole Milk',
                description: 'Farm fresh whole milk, rich and creamy',
                category: categoryMap['Dairy'],
                price: 3.50,
                stock: 50,
                unit: 'liter',
                image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
                tags: ['dairy', 'organic'],
            },
            {
                name: 'Sourdough Bread',
                description: 'Freshly baked artisan sourdough bread',
                category: categoryMap['Bakery'],
                price: 4.99,
                stock: 30,
                unit: 'piece',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
                tags: ['fresh', 'artisan'],
                discount: 5,
            },
            {
                name: 'Avocados',
                description: 'Creamy ripe avocados, perfect for toast or salads',
                category: categoryMap['Vegetables'],
                price: 1.99,
                stock: 80,
                unit: 'piece',
                image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
                tags: ['fresh', 'super-food'],
            },
            {
                name: 'Free-Range Eggs',
                description: 'Farm fresh organic eggs from free-range chickens',
                category: categoryMap['Dairy'],
                price: 5.99,
                stock: 60,
                unit: 'dozen',
                image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7',
                tags: ['organic', 'protein'],
            },
            {
                name: 'Fresh Broccoli',
                description: 'Fresh green broccoli, packed with nutrients',
                category: categoryMap['Vegetables'],
                price: 2.49,
                stock: 40,
                unit: 'kg',
                image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc',
                tags: ['fresh', 'healthy'],
            },
            {
                name: 'Chicken Breast',
                description: 'Lean, high-quality chicken breast',
                category: categoryMap['Meat'],
                price: 8.99,
                stock: 25,
                unit: 'kg',
                image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791',
                tags: ['protein', 'lean'],
            },
            {
                name: 'Salmon Fillet',
                description: 'Fresh Atlantic salmon, rich in omega-3',
                category: categoryMap['Seafood'],
                price: 12.99,
                stock: 20,
                unit: 'kg',
                image: 'https://images.unsplash.com/photo-1485704686097-ed47f7263ca4',
                tags: ['seafood', 'omega-3'],
                discount: 15,
            },
            {
                name: 'Cheddar Cheese',
                description: 'Sharp aged cheddar cheese',
                category: categoryMap['Dairy'],
                price: 6.50,
                stock: 45,
                unit: 'kg',
                image: 'https://images.unsplash.com/photo-1452195100486-9cc805987962',
                tags: ['dairy', 'aged'],
            },
            {
                name: 'Fresh Carrots',
                description: 'Crunchy orange carrots, great for snacking',
                category: categoryMap['Vegetables'],
                price: 1.29,
                stock: 200,
                unit: 'kg',
                image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
                tags: ['fresh', 'vitamin-a'],
            },
            {
                name: 'Oranges',
                description: 'Juicy sweet oranges, full of vitamin C',
                category: categoryMap['Fruits'],
                price: 3.49,
                stock: 120,
                unit: 'kg',
                image: 'https://images.unsplash.com/photo-1547514701-42782101795e',
                tags: ['fresh', 'citrus'],
            },
        ];

        const createdProducts = await Product.insertMany(products);
        console.log(`✓ Created ${createdProducts.length} products`);

        // Create admin user
        console.log('👤 Creating admin user...');
        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        await User.create({
            name: 'Admin User',
            email: 'admin@grocery.com',
            password: hashedPassword,
            role: 'admin',
            phone: '+91 1234567890',
        });
        console.log('✓ Admin user created (admin@grocery.com / Admin@123)');

        console.log('\n✅ Database seeded successfully!');
        console.log('📊 Summary:');
        console.log(`   - ${createdCategories.length} categories`);
        console.log(`   - ${createdProducts.length} products`);
        console.log(`   - 1 admin user`);
        console.log('\n🔑 Admin Credentials:');
        console.log('   Email: admin@grocery.com');
        console.log('   Password: Admin@123\n');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
