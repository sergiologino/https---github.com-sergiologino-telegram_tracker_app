import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем 'react-dom/client' вместо 'react-dom'
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Создаем корневой элемент

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);