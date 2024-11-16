import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Survey from './components/Survey';
import AdminSettings from './components/AdminSettings';
import './App.css';

const App = () => {
    useEffect(() => {
        //window.Telegram.WebView. .ready();
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Приложение загружено!</h1>
                <Survey/>
                <AdminSettings/>
            </div>
        </div>
    );
};

export default App;