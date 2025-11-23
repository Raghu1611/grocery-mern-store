require('dotenv').config();
const mongoose = require('mongoose');

console.log('Current Directory:', process.cwd());
console.log('Environment Variables Check:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Defined' : 'Undefined');
console.log('PORT:', process.env.PORT);
console.log('BREVO_PASSWORD:', process.env.BREVO_PASSWORD ? 'Defined' : 'Undefined');

if (!process.env.MONGO_URI) {
    console.error('CRITICAL: MONGO_URI is not defined in .env');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connection Successful');
        process.exit(0);
    })
    .catch(err => {
        console.error('MongoDB Connection Failed:', err.message);
        process.exit(1);
    });
