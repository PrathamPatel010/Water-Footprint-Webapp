require('dotenv').config();
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;
const getDb = async() => {
    try {
        const conn = await mongoose.connect(DB_URI);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { getDb };