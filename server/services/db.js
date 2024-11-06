// src/services/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //mongoose.connect('mongodb://username:password@host:port/database?options...');
        await mongoose.connect('mongodb://altauser:altauser@81.200.147.214:27017/altaMiniTrack?authSource=admin&directConnection=true', {
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
