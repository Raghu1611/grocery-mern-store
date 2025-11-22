const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');

dotenv.config();

const products = [
    {
        name: 'Fresh Apples',
        category: 'Fruits',
        price: 2.99,
        stock: 100,
        image: '🍎',
        description: 'Crisp and sweet red apples.'
    },
    {
        name: 'Organic Bananas',
        category: 'Fruits',
        price: 1.49,
        stock: 150,
        image: '🍌',
        description: 'Rich in potassium.'
    },
    {
        name: 'Whole Milk',
        category: 'Dairy',
        price: 3.50,
        stock: 50,
        image: '🥛',
        description: 'Farm fresh whole milk.'
    },
    {
        name: 'Sourdough Bread',
        category: 'Bakery',
        price: 4.99,
        stock: 30,
        image: '🍞',
        description: 'Freshly baked sourdough.'
    },
    {
        name: 'Avocados',
        category: 'Vegetables',
        price: 1.99,
        stock: 80,
        image: '🥑',
        description: 'Creamy ripe avocados.'
    },
    {
        name: 'Eggs (Dozen)',
        category: 'Dairy',
        price: 5.99,
        stock: 60,
        image: '🥚',
        description: 'Free-range organic eggs.'
    },
    {
        name: 'Broccoli',
        category: 'Vegetables',
        price: 2.49,
        stock: 40,
        image: '🥦',
        description: 'Fresh green broccoli.'
    },
    {
        name: 'Chicken Breast',
        category: 'Meat',
        price: 8.99,
        stock: 25,
        image: '🍗',
        description: 'Lean chicken breast.'
    },
    {
        name: 'Salmon Fillet',
        category: 'Seafood',
        price: 12.99,
        stock: 20,
        image: '🐟',
        description: 'Fresh Atlantic salmon.'
    },
    {
        name: 'Cheddar Cheese',
        category: 'Dairy',
        price: 6.50,
        stock: 45,
        image: '🧀',
        description: 'Sharp cheddar cheese.'
    }
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('Deleting existing products...');
        await Product.deleteMany({});

        console.log('Inserting new products...');
        await Product.insertMany(products);

        console.log('Data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
