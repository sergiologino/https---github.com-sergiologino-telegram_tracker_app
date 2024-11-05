import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// src/index.js

const connectDB = require('./services/db');
const express = require('express');
const app = express();

connectDB();

app.use(express.json());

app.listen(3000, () => console.log("Сервер запущен на порту 3000"));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const surveyRoutes = require('./routes/surveyRoutes');
app.use('/api', surveyRoutes);

const scheduleSurveys = require('./services/cronService');
// Инициализация планировщика
scheduleSurveys();

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
