// src/services/authService.js

const allowedUsers = ['user1', 'user2', 'user3']; // Список разрешенных пользователей

export const isUserAllowed = (username) => {
    return allowedUsers.includes(username);
};
