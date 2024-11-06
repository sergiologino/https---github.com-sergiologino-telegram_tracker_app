// server/server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

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
