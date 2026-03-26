const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config({ path: __dirname + '/.env' });

const users = [
    {
        name: 'Admin User',
        email: 'sukrut.dusane@gmail.com',
        password: '202501110114TestPassword123',
        role: 'admin'
    },
    {
        name: 'Club President',
        email: 'member@clubsync.com',
        password: 'password123',
        role: 'member'
    },
    {
        name: 'Regular Student',
        email: 'student@clubsync.com',
        password: 'password123',
        role: 'student'
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Delete existing users to avoid duplicates during test seeding
        await User.deleteMany({ email: { $in: users.map(u => u.email) } });

        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await User.create(user);
        }

        console.log('✅ Dummy users seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedUsers();
