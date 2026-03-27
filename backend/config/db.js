const mongoose = require('mongoose');

let isMockMode = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    if (mongoose.connection.readyState === 1) {
      console.log(`✅ Database Connected to Atlas: ${conn.connection.host}`);
    }
    isMockMode = false;
  } catch (error) {
    console.error(`❌ Connection Failed: ${error.message}`);
    isMockMode = true;
  }
};

module.exports = connectDB;
