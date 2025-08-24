import React from 'react';
import ReactDOM from 'react-dom/client';
import Game_view from './GameView';


const root = ReactDOM.createRoot(
  document.getElementById('root')!
);
root.render(
  <React.StrictMode>
    <Game_view />
  </React.StrictMode>
);

