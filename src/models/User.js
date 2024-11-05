// src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    scheduledTime: { type: String, required: false }, // Время для автоматического запуска
});

module.exports = mongoose.model('User', userSchema);
