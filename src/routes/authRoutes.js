// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const AdminSettings = require('../models/AdminSettings');

router.post('/check-user', async (req, res) => {
    const { username } = req.body;

    try {
        const settings = await AdminSettings.findOne();
        const isAllowed = settings?.allowedUsers.includes(username);

        res.json({ isAllowed });
    } catch (error) {
        console.error("Ошибка проверки пользователя:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;
