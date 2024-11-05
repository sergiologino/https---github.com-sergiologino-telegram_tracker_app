// src/routes/surveyRoutes.js

const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// Список вопросов для опроса
const questions = [
    "Как прошел вчерашний день?",
    "Какие планы на сегодня?",
    "Есть какие-нибудь трудности или проблемы?"
];

// Начало опроса
router.post('/start-survey', async (req, res) => {
    const { username } = req.body;
    const currentQuestion = req.body.currentQuestion || 0; // Текущий вопрос

    // Проверяем, что текущий вопрос в пределах списка вопросов
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        res.json({ question, nextQuestion: currentQuestion + 1 });
    } else {
        res.json({ message: "Опрос завершен. Спасибо за ответы!" });
    }
});

// Сохранение ответа на вопрос
router.post('/save-answer', async (req, res) => {
    const { username, question, answer } = req.body;

    try {
        const newResponse = new Response({
            username,
            question,
            answer
        });

        await newResponse.save();
        res.json({ message: "Ответ сохранен" });
    } catch (error) {
        console.error("Ошибка сохранения ответа:", error);
        res.status(500).json({ message: "Ошибка сохранения ответа" });
    }
});

module.exports = router;
