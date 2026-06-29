const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully.");
        
    } catch (err) {
        console.err(`DB Connection Failed`, err);
    }
}

module.exports = connectDB;