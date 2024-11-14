// src/services/authService.js

const allowedUsers = ['428540866', '481451826', '1833578140']; // Список разрешенных пользователей

export const isUserAllowed = (username) => {
    return allowedUsers.includes(username);
};
