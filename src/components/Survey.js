// src/components/Survey.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Survey = () => {
    const [isFirstRun, setIsFirstRun] = useState(false);
    const [scheduledTime, setScheduledTime] = useState("");

    useEffect(() => {
        const { WebApp } = window.Telegram;
        WebApp.setHeaderColor('#4682B4'); // Синий цвет заголовка
        WebApp.MainButton.setText('Продолжить');
    }, []);

    useEffect(() => {
        checkFirstRun();
    }, []);

    const showMainButton = () => {
        const { MainButton } = window.Telegram.WebApp;
        MainButton.show();
        MainButton.onClick(() => {
            // Ваш код для отправки данных или перехода к следующему шагу
            MainButton.hide();
        });
    };

// Вызов функции для отображения кнопки
    useEffect(() => {
        showMainButton();
    }, []);
    
    const checkFirstRun = async () => {
        const username = window.Telegram.WebApp.initDataUnsafe.user.username;
        const response = await axios.post('/api/check-scheduled-time', { username });
        if (!response.data.scheduledTime) {
            setIsFirstRun(true);
        }
    };
    const submitTime = async () => {
        const username = window.Telegram.WebApp.initDataUnsafe.user.username;
        await axios.post('/api/set-scheduled-time', { username, scheduledTime });
        setIsFirstRun(false);
    };

    if (isFirstRun) {
        return (
            <div>
                <h3>Укажите время для ежедневного запуска опроса (формат HH:mm)</h3>
                <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                />
                <button onClick={submitTime}>Сохранить</button>
            </div>
        );
    }
    const [username, setUsername] = useState("");
    const [question, setQuestion] = useState("Как прошел вчерашний день?");
    const [answer, setAnswer] = useState("");
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    
    useEffect(() => {
        // Получаем данные о пользователе из Telegram
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        setUsername(user?.username || "гость");

        // Загружаем первый вопрос
        startSurvey();
    }, []);

    const startSurvey = async () => {
        try {
            const response = await axios.post('/api/start-survey', { 
                username: window.Telegram.WebApp.initDataUnsafe.user.username,
                currentQuestion: 0 
            });
            if (response.data.message) {
                setSurveyCompleted(true);
            } else {
                setQuestion(response.data.question);
            }
        } catch (error) {
            console.error("Ошибка загрузки опроса:", error);
        }
    };

    const submitAnswer = async () => {
        try {
            await axios.post('/api/save-answer', {
                username: window.Telegram.WebApp.initDataUnsafe.user.username,
                question,
                answer
            });
            setAnswer("");
            startSurvey(); // Загружаем следующий вопрос
        } catch (error) {
            console.error("Ошибка сохранения ответа:", error);
        }
    };

    // Функция для запуска распознавания речи
    const startVoiceRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'ru-RU'; // Устанавливаем русский язык
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setAnswer(transcript); // Устанавливаем распознанный текст как ответ
        };

        recognition.onerror = (event) => {
            console.error("Ошибка распознавания речи:", event.error);
        };

        recognition.start();
    };

    if (surveyCompleted) {
        return <div>Спасибо за участие в опросе! Хорошего дня!</div>;
    }

    return (
        <div>
            <h1>Привет, {username}!</h1>
            <p>{question}</p>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Ваш ответ..."
                className="input"
            />
            <button onClick={submitAnswer} className="button">Отправить</button>
            <button onClick={startVoiceRecognition} className="button">Ответить голосом</button>
        </div>
    );
};

export default Survey;
