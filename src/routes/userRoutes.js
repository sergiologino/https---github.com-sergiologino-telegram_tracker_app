// src/routes/userRoutes.js

const User = require('../models/User');
const router = require('express').Router();

router.post('/set-scheduled-time', async (req, res) => {
    const { username, scheduledTime } = req.body;

    try {
        await User.updateOne({ username }, { scheduledTime });
        res.json({ message: "Время для запуска опроса установлено" });
    } catch (error) {
        console.error("Ошибка установки времени:", error);
        res.status(500).json({ message: "Ошибка установки времени" });
    }
});

module.exports = router;
