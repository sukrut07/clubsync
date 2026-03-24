const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Club = require('./models/Club');
const Event = require('./models/Event');
const Participation = require('./models/Participation');
const Announcement = require('./models/Announcement');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Club.deleteMany({});
        await Event.deleteMany({});
        await Participation.deleteMany({});
        await Announcement.deleteMany({});

        console.log('Old data cleared.');

        // 1. Create Users
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@clubsync.com', password, role: 'admin' },
            { name: 'Club President', email: 'president@clubsync.com', password, role: 'member' },
            { name: 'Alice Smith', email: 'alice@student.com', password, role: 'student' },
            { name: 'Bob Johnson', email: 'bob@student.com', password, role: 'student' },
            { name: 'Charlie Davis', email: 'charlie@student.com', password, role: 'student' },
            { name: 'Diana Prince', email: 'diana@student.com', password, role: 'student' },
        ]);

        console.log('Users seeded.');

        // 2. Create Clubs
        const clubs = await Club.insertMany([
            { clubName: 'Tech Pioneers', description: 'Exploring the edge of technology.', createdBy: users[1]._id, points: 5400, level: 5 },
            { clubName: 'Creative Arts', description: 'Design, visual arts, and more.', createdBy: users[1]._id, points: 3200, level: 3 },
            { clubName: 'Sports Club', description: 'Campus athletic community.', createdBy: users[1]._id, points: 2800, level: 2 },
            { clubName: 'Robotics Hub', description: 'Building the future of automation.', createdBy: users[1]._id, points: 4100, level: 4 },
        ]);

        console.log('Clubs seeded.');

        // 3. Create Events
        const now = new Date();
        const futureDate = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
        const pastDate = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        const events = await Event.insertMany([
            {
                eventName: 'Neon Hackathon 2026',
                description: '48 hours of pure building and innovation.',
                date: futureDate(5),
                time: '10:00 AM',
                venue: 'Auditorium A',
                organizer: 'Tech Pioneers',
                clubId: clubs[0]._id,
                maxParticipants: 150,
                teamAllowed: true,
                teamSize: 4
            },
            {
                eventName: 'UI Design Workshop',
                description: 'Master Figma and modern styling.',
                date: pastDate(2),
                time: '02:00 PM',
                venue: 'Studio B',
                organizer: 'Creative Arts',
                clubId: clubs[1]._id,
                maxParticipants: 50
            },
            {
                eventName: 'RoboWars v2',
                description: 'Battle of the bots.',
                date: pastDate(10),
                time: '11:00 AM',
                venue: 'Engineering Plaza',
                organizer: 'Robotics Hub',
                clubId: clubs[3]._id,
                maxParticipants: 80
            },
            {
                eventName: 'Cloud Computing 101',
                description: 'Introduction to Azure and AWS.',
                date: futureDate(12),
                time: '04:00 PM',
                venue: 'IT Lab 4',
                organizer: 'Tech Pioneers',
                clubId: clubs[0]._id,
                maxParticipants: 60
            }
        ]);

        console.log('Events seeded.');

        // 4. Create Participation
        await Participation.insertMany([
            { studentId: users[2]._id, eventId: events[1]._id, attendance: true, pointsEarned: 10, clubId: clubs[1]._id, markedBy: users[0]._id },
            { studentId: users[3]._id, eventId: events[1]._id, attendance: true, pointsEarned: 10, clubId: clubs[1]._id, markedBy: users[0]._id },
            { studentId: users[4]._id, eventId: events[2]._id, attendance: true, pointsEarned: 10, clubId: clubs[3]._id, markedBy: users[0]._id },
            { studentId: users[2]._id, eventId: events[2]._id, attendance: true, pointsEarned: 10, clubId: clubs[3]._id, markedBy: users[0]._id },
        ]);

        console.log('Participation history seeded.');

        // 5. Create Announcements
        await Announcement.insertMany([
            { title: 'Recruitment Drive!', description: 'Tech Pioneers is looking for Web Developers. Apply before Monday.', clubId: clubs[0]._id, postedBy: users[1]._id, date: pastDate(1) },
            { title: 'Workshop Success', description: 'Thank you all for joining the UI workshop. Slides are in the discord.', clubId: clubs[1]._id, postedBy: users[1]._id, date: pastDate(2) },
        ]);

        console.log('Announcements seeded.');

        console.log('All data seeded successfully! 🚀');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
