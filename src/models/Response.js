// src/models/Response.js

const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    username: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
