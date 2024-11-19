// src/components/AdminSettings.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSettings = () => {
    const [allowedUsers, setAllowedUsers] = useState([]);
    const [newUser, setNewUser] = useState("");

    const fetchSettings = async () => {
        const response = await axios.get('${SERVER_URL}/api/admin-settings');
        let tempAllowedUsers=[428540866,1833578140];
        // setAllowedUsers(response.data.allowedUsers);
        setAllowedUsers(tempAllowedUsers);


    };

    const addUser = async () => {
        await axios.post('${SERVER_URL}/api/admin-settings/add-user', { username: newUser });
        setNewUser("");
        fetchSettings();
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <div>
            <h3>Список разрешенных пользователей</h3>
            <ul>
                {allowedUsers.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="Добавить пользователя"
            />
            <button onClick={addUser}>Добавить</button>
        </div>
    );
};

export default AdminSettings;
