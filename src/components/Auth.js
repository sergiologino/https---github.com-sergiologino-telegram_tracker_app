/// src/components/Auth.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Auth = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const username = window.Telegram.WebApp.initData.user.username;

        const checkAuthorization = async () => {
            try {
                const response = await axios.post('${SERVER_URL}/api/check-user', { username });
                setIsAuthorized(response.data.isAllowed);
            } catch (error) {
                console.error("Ошибка проверки доступа:", error);
                alert("У вас нет доступа к этому приложению.");
            }
        };

        checkAuthorization();
    }, []);

    if (!isAuthorized) return <div>Доступ запрещен</div>;
    return <div>{children}</div>;
};

export default Auth;
