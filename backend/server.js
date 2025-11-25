const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
console.log('🚀 Starting server...');
console.log(`📝 Environment variables loaded:`);
console.log(`   - PORT: ${PORT}`);
console.log(`   - MONGO_URI: ${process.env.MONGO_URI ? 'SET' : 'NOT SET'}`);
console.log(`   - JWT_SECRET: ${process.env.JWT_SECRET ? 'SET' : 'NOT SET'}`);
console.log(`   - VERIFY_API_KEY: ${process.env.VERIFY_API_KEY ? 'SET (length: ' + process.env.VERIFY_API_KEY.length + ')' : 'NOT SET'}`);
console.log('');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/grocery-mern')
    .then(() => {
        console.log('✅ MongoDB Connected');
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('⚠️  Server will continue running but database features won\'t work');
    });

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log('');
});
