import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Survey = () => {
    const [username, setUsername] = useState("");
    const [question, setQuestion] = useState("Как прошел вчерашний день?");
    const [answer, setAnswer] = useState("");
    const [surveyCompleted, setSurveyCompleted] = useState(false);

    useEffect(() => {
        // Проверяем наличие window.Telegram и инициализируем приложение
        console.log("Проверяем наличие window.Telegram и инициализируем приложение in Survey ");
        if (window.Telegram && window.Telegram.WebView) {
            console.log(" it's telegram app");
            const { WebApp } = window.Telegram;
            WebApp.setHeaderColor('#4682B4');
            WebApp.MainButton.setText('Продолжить');

            // Получаем данные о пользователе из Telegram WebApp
            const user = WebApp.initDataUnsafe?.user;
            setUsername(user?.username || "гость");

            // Загружаем первый вопрос
            startSurvey();
        } else {
            console.error("Telegram Web App API недоступен. Проверьте, что приложение запущено внутри Telegram.");
        }
    }, []);

    const startSurvey = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/start-survey`, {
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
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/save-answer`, {
                username,
                question,
                answer
            });
            setAnswer("");
            startSurvey(); // Загружаем следующий вопрос
        } catch (error) {
            console.error("Ошибка сохранения ответа:", error);
        }
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
        </div>
    );
};

export default Survey;
