import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mainButton } from '@telegram-apps/sdk';
import { initData } from '@telegram-apps/sdk';

initData.restore();

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
            const {WebApp} = window.Telegram;

            // if (WebApp.setHeaderColor.isAvailable()) {
            //     WebApp.setHeaderColor('#296cf2');
            //     WebApp.headerColor(); // 'bg_color'
            // }


            if (mainButton.mount.isAvailable()) {
                mainButton.mount();
                mainButton.isMounted(); // true
            }
            if (mainButton.setParams.isAvailable()) {
                mainButton.setParams({
                    backgroundColor: '#296cf2',
                    hasShineEffect: true,
                    isEnabled: true,
                    isLoaderVisible: true,
                    isVisible: true,
                    text: 'Продолжить',
                    textColor: '#ffffff'
                });
                mainButton.backgroundColor(); // '#FFFF00'
                mainButton.hasShineEffect(); // true
                mainButton.isEnabled(); // true
                mainButton.isLoaderVisible(); // true
                mainButton.isVisible(); // true
                mainButton.text(); // 'Продолжить'
                mainButton.textColor(); // '#ffffff'
                mainButton.state();
                // Получаем данные о пользователе из Telegram WebApp
                const user = WebApp.initData?.user;
                setUsername(user?.username || "гость");

                // Загружаем первый вопрос
                startSurvey();
            } else {
                console.error("Telegram Web App API недоступен. Проверьте, что приложение запущено внутри Telegram.");
            };
        }}
        );

    const startSurvey = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/start-survey`, {
                username: window.Telegram.WebApp.initData.user.username,
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
