import React from 'react';
import ReactDOM from 'react-dom/client';
// * css
import './styles/global.css';
import './styles/mui.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import { MuiTheme } from './styles/MuiTheme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// * component
import App from './App';
// * install library
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ToastContainer pauseOnFocusLoss={false} autoClose={3000} />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={MuiTheme(rootElement)}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);
