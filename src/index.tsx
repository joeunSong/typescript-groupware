import React from 'react';
import ReactDOM from 'react-dom/client';
// * css
import './styles/global.css';
import './styles/mui.css';
import { MuiTheme } from './styles/MuiTheme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
// * component
import { PrimeReactProvider } from 'primereact/api';
import App from './App';

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
    <PrimeReactProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={MuiTheme(rootElement)}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);
