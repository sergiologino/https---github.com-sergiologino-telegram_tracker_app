// server/routes/adminSettingsRoutes.js

const express = require('express');
const router = express.Router();

// Пример данных
const adminSettings = {
    allowedUsers: ['428540866', '1833578140'],
    applicationStatus: 'active',
};

// Маршрут для получения настроек администратора
router.get('/admin-settings', (req, res) => {
    res.json(adminSettings); // Возвращаем JSON-ответ
});

module.exports = router;
