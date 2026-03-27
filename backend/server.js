const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const User = require('./models/User');
const Test = require('./models/Test');
const authRoutes = require('./routes/auth');
const bcrypt = require('bcryptjs');

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(async () => {
    // Skip initialization if in Mock Mode
    if (mongoose.connection.readyState !== 1) {
        console.warn('⚠️ Skipping Database Initialization: Bypassing Atlas.');
        return;
    }

    try {
        await Test.create({ name: 'Database Initializer' });
        console.log('✅ Test document inserted to force DB creation');

        // Insert default admin if not exists
        const adminEmail = 'admin@mitaoe.com';
        const adminExists = await User.findOne({ email: adminEmail });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                name: 'Default Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                club: 'MITAOE'
            });
            console.log('✅ Default admin user created');
        }

        // Insert default member
        const memberEmail = 'member@clubsync.com';
        const memberExists = await User.findOne({ email: memberEmail });
        if (!memberExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            await User.create({
                name: 'Club Admin User',
                email: memberEmail,
                password: hashedPassword,
                role: 'member',
                club: 'GDG MITAOE'
            });
            console.log('✅ Default member user created');
        }

        // Insert default student
        const studentEmail = 'student@clubsync.com';
        const studentExists = await User.findOne({ email: studentEmail });
        if (!studentExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            await User.create({
                name: 'Student User',
                email: studentEmail,
                password: hashedPassword,
                role: 'student'
            });
            console.log('✅ Default student user created');
        }
    } catch (err) {
        console.error('❌ Error during database initialization:', err.message);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 ClubSync Server running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV}`);
});
