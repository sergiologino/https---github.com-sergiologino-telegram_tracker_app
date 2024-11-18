// server/server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

require('dotenv').config(); // Загружаем переменные окружения из .env
//const express = require('express');
const axios = require('axios'); // Используется для запросов к Telegram API

//const app = express();
const botToken = process.env.TELEGRAM_BOT_TOKEN; // Доступ к токену бота
const adminIds = process.env.TELEGRAM_ADMIN_IDS ? process.env.TELEGRAM_ADMIN_IDS.split(',') : [];
// Подключение к базе данных
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const isAdmin = (userId) => adminIds.includes(userId.toString());


// Маршруты
const surveyRoutes = require('./routes/surveyRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', surveyRoutes);
app.use('/api', authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
