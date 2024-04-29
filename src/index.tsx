import React from 'react';
import ReactDOM from 'react-dom/client';
// * css
import './styles/global.css';
// * component
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
