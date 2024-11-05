import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Survey from './components/Survey';
import AdminSettings from './components/AdminSettings';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
const App = () => {
  useEffect(() => {
      // Инициализация Telegram Web App
      window.Telegram.WebApp.ready();
  }, []);

  return (
      <div>
          <Survey />
          <AdminSettings />
      </div>
  );
};

export default App;
