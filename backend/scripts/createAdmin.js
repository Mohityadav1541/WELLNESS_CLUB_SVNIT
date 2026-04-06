const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const createAdmin = async () => {
    await connectDB();

    try {
        const adminEmail = 'admin@wellness.com';
        const adminPassword = 'password123';

        // Check if admin already exists
        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create admin user
        const user = await User.create({
            name: 'Super Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'Super Admin',
            // WhatsApp and admission number are not required for Admin based on model logic
            // But if schema validation requires them for 'Student', it's fine.
            // Let's check model... required function checks if role === 'Student'.
            // So we don't need them.
        });

        console.log('Super Admin user created successfully');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
