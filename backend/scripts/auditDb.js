const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const auditDatabase = async () => {
    console.log('🔍 Starting Database Connectivity Audit...');

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });

        if (mongoose.connection.readyState === 1) {
            console.log('✅ Status: Database Connected');
            console.log(`📡 Host: ${mongoose.connection.host}`);

            // Check Indexes
            const indexes = await User.collection.indexes();
            const indexNames = indexes.map(idx => idx.name);

            console.log('📊 Index Audit:');

            const hasEmailIndex = indexes.some(idx => idx.key.email === 1 && idx.unique);
            const hasPrnIndex = indexes.some(idx => idx.key.prn === 1 && idx.unique);

            console.log(`   - Email Unique Index: ${hasEmailIndex ? '✅ OK' : '❌ MISSING'}`);
            console.log(`   - PRN Unique Index: ${hasPrnIndex ? '✅ OK' : '❌ MISSING'}`);

            if (!hasEmailIndex || !hasPrnIndex) {
                console.warn('⚠️ Warning: Unique indexes may not be fully synced in Atlas yet.');
            }
        } else {
            console.error('❌ Status: Connection is not ready.');
        }

    } catch (error) {
        console.error(`💥 Audit Failed: ${error.message}`);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

auditDatabase();
