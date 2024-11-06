// src/models/AdminSettings.js

const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
    allowedUsers: { type: [String], required: true },
    appEnabled: { type: Boolean, default: true },
    autoRunEndDate: { type: Date, required: false }
});

module.exports = mongoose.model('AdminSettings', adminSettingsSchema);
