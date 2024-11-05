// src/services/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/altaMiniTrack', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB подключена");
    } catch (error) {
        console.error("Ошибка подключения к MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
