// src/services/cronService.js

const cron = require('node-cron');
const User = require('../models/User');
const axios = require('axios');

// Функция для запуска опроса
const startSurveyForUser = async (username) => {
    try {
        await axios.post('http://localhost:3000/api/start-survey', { username });
    } catch (error) {
        console.error(`Ошибка запуска опроса для пользователя ${username}:`, error);
    }
};

// Запускаем планировщик
const scheduleSurveys = () => {
    User.find({}).then(users => {
        users.forEach(user => {
            if (user.scheduledTime) {
                // Создаем задачу cron для каждого пользователя на указанное время
                cron.schedule(user.scheduledTime, () => {
                    startSurveyForUser(user.username);
                });
            }
        });
    });
};

module.exports = scheduleSurveys;
