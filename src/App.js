import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Survey from './components/Survey';
import AdminSettings from './components/AdminSettings';
import './App.css';

const App = () => {
    useEffect(() => {
        window.Telegram.WebApp.ready();
    }, []);

    return (
        <div className="container">
            <div className="card">
                <Survey />
                <AdminSettings />
            </div>
        </div>
    );
};

export default App;