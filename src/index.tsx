import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
// * css
import './styles/global.css';
import { MuiTheme } from './styles/MuiTheme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// * component
import App from './App';
import Login from './pages/user/Login';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
// ]);

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={MuiTheme(rootElement)}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
