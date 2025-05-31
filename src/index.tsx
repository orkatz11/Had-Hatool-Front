import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game_view from './game_view';


const root = ReactDOM.createRoot(
  document.getElementById('root')!
);
root.render(
  <React.StrictMode>
    <Game_view />
  </React.StrictMode>
);

