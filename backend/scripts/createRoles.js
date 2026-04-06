const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        console.log("Attempting to connect...");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const createRoles = async () => {
    await connectDB();

    try {
        // 1. Create Super Admin
        const superAdminEmail = 'admin@wellness.com';
        const superAdminPassword = 'admin123'; // Updated to match user expectation

        let superAdmin = await User.findOne({ email: superAdminEmail });

        if (!superAdmin) {
            await User.create({
                name: 'Super Admin User',
                email: superAdminEmail,
                password: superAdminPassword,
                role: 'superadmin',
                isActive: true
            });
            console.log(`✅ Super Admin created: ${superAdminEmail} / ${superAdminPassword}`);
        } else {
            // Update password if exists
            superAdmin.password = superAdminPassword;
            superAdmin.role = 'superadmin';
            await superAdmin.save();
            console.log(`ℹ️ Super Admin updated: ${superAdminEmail} / ${superAdminPassword}`);
        }

        // 2. Create Standard Admin (Event Manager)
        const adminEmail = 'manager@wellness.com';
        const adminPassword = 'adminpassword123';

        let admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            await User.create({
                name: 'Event Manager',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                isActive: true
            });
            console.log('✅ Admin created: manager@wellness.com / adminpassword123');
        } else {
            admin.role = 'admin';
            await admin.save();
            console.log('ℹ️ Admin already exists');
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createRoles();
